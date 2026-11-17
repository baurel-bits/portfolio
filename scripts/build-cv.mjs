#!/usr/bin/env node
/**
 * Régénère le PDF du CV depuis le DOCX source.
 *
 * Le CV téléchargeable est un document Word : le PDF doit donc être
 * reconstruit à chaque modification. Aucun convertisseur natif (Word,
 * LibreOffice) n'est requis : le DOCX est rendu dans Chrome (`docx-preview`)
 * puis imprimé en A4 par l'API DevTools.
 *
 *   npm run cv:pdf                      # public/cv/CV-Baurel-Bemmo-Fullstack
 *   npm run cv:pdf -- chemin/autre.docx # autre document
 *
 * Variables : `CHROME_PATH` pour imposer un binaire Chrome/Edge, `CV_DOCX`
 * pour changer la source par défaut.
 */
import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import WebSocket from "ws";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const DEFAULT_DOCX = path.join(ROOT, "public/cv/CV-Baurel-Bemmo-Fullstack.docx");
const DOCX = path.resolve(process.argv[2] ?? process.env.CV_DOCX ?? DEFAULT_DOCX);
const PDF = DOCX.replace(/\.docx$/i, ".pdf");

/**
 * Repères du CV publié. Le script échoue si l'un d'eux disparaît, pour éviter de
 * mettre en ligne un CV tronqué après une retouche du DOCX. À ajuster avec le CV.
 */
const EXPECTED = {
  pages: 1,
  a4: { width: 595, height: 842 },
  techBlocks: 7,
  required: ["porfoliodeteker.netlify.app/fr", "OpenClassrooms", "JavaScript"],
  forbidden: ["TradeFlow", "junior"],
};

const CHROME_PATHS = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/google-chrome-stable",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/snap/bin/chromium",
];

const PAGE = `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>CV</title>
    <style>
      * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      html, body { margin: 0; padding: 0; background: #fff; }
      .docx-wrapper {
        padding: 0 !important;
        background: #fff !important;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .docx-wrapper > section.docx {
        box-shadow: none !important;
        margin: 0 !important;
      }
      /* docx-preview active l'hyphenation automatique : elle coupe les noms
         propres et les technologies, ce qui gêne la lecture automatique du CV. */
      .docx-wrapper section.docx,
      .docx-wrapper section.docx * {
        hyphens: none !important;
        -webkit-hyphens: none !important;
      }
      @page { size: A4; margin: 0; }
    </style>
    <script src="/jszip.min.js"></script>
    <script src="/docx-preview.min.js"></script>
  </head>
  <body>
    <div id="out"></div>
    <script>
      (async () => {
        const response = await fetch("/cv.docx");
        await docx.renderAsync(await response.arrayBuffer(), document.getElementById("out"), null, {
          className: "docx",
          inWrapper: true,
          breakPages: true,
          ignoreWidth: false,
          ignoreHeight: false,
          renderHeaders: true,
          renderFooters: true,
          useBase64URL: true,
        });
        window.__ready = true;
      })().catch((error) => {
        window.__error = String(error);
      });
    </script>
  </body>
</html>`;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findChrome() {
  const found = CHROME_PATHS.find((candidate) => candidate && fs.existsSync(candidate));

  if (!found) {
    throw new Error(
      "Chrome ou Edge introuvable. Installez-en un ou définissez CHROME_PATH vers le binaire.",
    );
  }

  return found;
}

/** Contrôles sur le rendu HTML : rien n'a été perdu ni coupé avant l'impression. */
function verifyRender({ text, sections, hyphens }) {
  const problems = [];

  if (sections !== EXPECTED.pages) {
    problems.push(`${EXPECTED.pages} page(s) attendue(s) dans le rendu, ${sections} trouvée(s)`);
  }
  if (hyphens !== "none") {
    problems.push(`hyphenation active (${hyphens}) : le rendu peut couper des noms propres`);
  }

  const techBlocks = (text.match(/Technologies/g) ?? []).length;
  if (techBlocks !== EXPECTED.techBlocks) {
    problems.push(`${EXPECTED.techBlocks} blocs « Technologies » attendus, ${techBlocks} trouvés`);
  }
  for (const snippet of EXPECTED.required) {
    if (!text.includes(snippet)) problems.push(`texte attendu absent : « ${snippet} »`);
  }
  const lower = text.toLowerCase();
  for (const word of EXPECTED.forbidden) {
    if (lower.includes(word.toLowerCase())) problems.push(`texte à retirer présent : « ${word} »`);
  }

  return problems;
}

/** Contrôles sur le PDF produit : une seule page, au format A4. */
function verifyPdf(buffer) {
  const problems = [];
  const raw = buffer.toString("latin1");
  const pages = (raw.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  const box = raw.match(/\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/);
  const width = box ? Math.round(Number(box[3]) - Number(box[1])) : null;
  const height = box ? Math.round(Number(box[4]) - Number(box[2])) : null;

  if (pages !== EXPECTED.pages) {
    problems.push(`${EXPECTED.pages} page attendue dans le PDF, ${pages || "aucune"} détectée(s)`);
  }
  if (width !== EXPECTED.a4.width || height !== EXPECTED.a4.height) {
    problems.push(
      `format A4 attendu (${EXPECTED.a4.width}×${EXPECTED.a4.height} pt), obtenu ${width}×${height} pt`,
    );
  }

  return problems;
}

const freePort = () =>
  new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });

/** Serveur local : page de rendu, DOCX et bibliothèques du navigateur. */
async function startServer() {
  // Les paquets n'exportent pas leurs fichiers dist : on part du point d'entrée
  // résolu et on rejoint le bundle navigateur voisin.
  const assets = {
    "/jszip.min.js": path.resolve(path.dirname(require.resolve("jszip")), "../dist/jszip.min.js"),
    "/docx-preview.min.js": path.join(path.dirname(require.resolve("docx-preview")), "docx-preview.min.js"),
  };
  for (const [url, file] of Object.entries(assets)) {
    if (!fs.existsSync(file)) throw new Error(`bundle introuvable pour ${url} : ${file}`);
  }
  const server = http.createServer((request, response) => {
    const url = (request.url ?? "/").split("?")[0];

    if (url === "/") {
      response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      response.end(PAGE);
      return;
    }

    try {
      const file = url === "/cv.docx" ? DOCX : assets[url];
      if (!file) throw new Error("inconnu");
      const body = fs.readFileSync(file);
      response.writeHead(200, {
        "Content-Type": url === "/cv.docx" ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "text/javascript",
      });
      response.end(body);
    } catch {
      response.writeHead(404).end("absent");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));

  return { server, port: server.address().port };
}

/** Client minimal du protocole DevTools (une commande = un identifiant). */
function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const pending = new Map();
    let nextId = 1;

    socket.on("error", reject);
    socket.on("message", (raw) => {
      const message = JSON.parse(raw.toString());
      const entry = pending.get(message.id);
      if (!entry) return;
      pending.delete(message.id);
      if (message.error) entry.reject(new Error(message.error.message));
      else entry.resolve(message.result);
    });
    socket.on("open", () =>
      resolve({
        send: (method, params = {}) =>
          new Promise((done, fail) => {
            const id = nextId++;
            pending.set(id, { resolve: done, reject: fail });
            socket.send(JSON.stringify({ id, method, params }));
          }),
        close: () => socket.close(),
      }),
    );
  });
}

async function main() {
  if (!fs.existsSync(DOCX)) throw new Error(`DOCX introuvable : ${DOCX}`);

  const chromePath = findChrome();
  const { server, port: httpPort } = await startServer();
  const cdpPort = await freePort();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), "cv-pdf-"));

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${cdpPort}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const cleanup = async () => {
    chrome.kill();
    server.close();
    // Sous Windows, Chrome garde le profil quelques instants : on attend puis on
    // retente, et un dossier temporaire resté verrouillé ne fait pas échouer la commande.
    await new Promise((r) => setTimeout(r, 800));
    try {
      fs.rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 200 });
    } catch {
      console.warn(`Profil temporaire non supprimé : ${profile}`);
    }
  };

  try {
    let target = null;
    for (let attempt = 0; attempt < 60 && !target; attempt += 1) {
      try {
        const targets = await (await fetch(`http://127.0.0.1:${cdpPort}/json/list`)).json();
        target = targets.find((item) => item.type === "page")?.webSocketDebuggerUrl ?? null;
      } catch {
        await sleep(200);
      }
    }
    if (!target) throw new Error("Chrome n'a pas ouvert de port de débogage.");

    const client = await connect(target);
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width: 900,
      height: 1400,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 900,
      screenHeight: 1400,
    });
    await client.send("Page.navigate", { url: `http://127.0.0.1:${httpPort}/` });

    let render = null;
    for (let attempt = 0; attempt < 100; attempt += 1) {
      await sleep(200);
      const { result } = await client.send("Runtime.evaluate", {
        expression: `JSON.stringify((() => {
          const section = document.querySelector('section.docx');
          return {
            ready: !!window.__ready,
            error: window.__error || null,
            sections: document.querySelectorAll('section.docx').length,
            hyphens: section ? getComputedStyle(section).hyphens : null,
            text: (document.getElementById('out')?.innerText || "").replace(/\\s+/g, ' ').trim(),
          };
        })())`,
        returnByValue: true,
      });
      const state = JSON.parse(result.value);
      if (state.error) throw new Error(`rendu du DOCX : ${state.error}`);
      if (state.ready) {
        render = state;
        break;
      }
    }
    if (!render?.sections) throw new Error("le DOCX n'a pas fini de se rendre.");

    const renderProblems = verifyRender(render);
    if (renderProblems.length > 0) {
      throw new Error(`contrôles du CV :\n - ${renderProblems.join("\n - ")}`);
    }

    const { data } = await client.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      paperWidth: 8.2677,
      paperHeight: 11.6929,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      scale: 1,
    });

    const pdf = Buffer.from(data, "base64");
    fs.writeFileSync(PDF, pdf);
    client.close();

    const pdfProblems = verifyPdf(pdf);
    if (pdfProblems.length > 0) {
      throw new Error(`contrôles du PDF :\n - ${pdfProblems.join("\n - ")}`);
    }

    const size = Math.round(pdf.length / 1024);
    console.log(`PDF : ${path.relative(ROOT, PDF)} (${size} Ko)`);
    console.log(
      `Contrôles OK : ${EXPECTED.pages} page ${EXPECTED.a4.width}×${EXPECTED.a4.height} pt, ` +
        `${EXPECTED.techBlocks} blocs « Technologies », textes clés présents, sans césure`,
    );
  } finally {
    await cleanup();
  }
}

main().catch((error) => {
  console.error(`Échec : ${error.message}`);
  process.exit(1);
});
