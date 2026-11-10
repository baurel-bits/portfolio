import { site } from "@/lib/site";

/**
 * Envoi du formulaire de contact via Web3Forms.
 * Documentation : https://docs.web3forms.com/getting-started/api-reference
 *
 * L'appel se fait depuis le navigateur : c'est l'usage recommandé par
 * Web3Forms (l'usage côté serveur est réservé aux offres payantes).
 * La clé est publique par conception, elle ne permet pas de lire les messages.
 */
export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export const web3formsAccessKey = (process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "").trim();

export const isWeb3FormsConfigured = web3formsAccessKey.length > 0;

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type SubmitOutcome =
  | { status: "success" }
  | { status: "rate-limited" }
  | { status: "rejected" };

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return typeof value === "object" && value !== null ? (value as JsonRecord) : null;
}

/** La réponse Web3Forms imbrique `message` dans `body` sur les succès et les 400. */
function readServerMessage(payload: unknown): string | undefined {
  const root = asRecord(payload);
  const body = asRecord(root?.body);
  const candidates = [body?.message, root?.message, root?.error];

  return candidates.find((value): value is string => typeof value === "string" && value.length > 0);
}

function isAccepted(payload: unknown): boolean {
  return asRecord(payload)?.success === true;
}

/**
 * Envoie le message et normalise la réponse HTTP en résultat exploitable.
 * Une erreur réseau (fetch rejeté) remonte volontairement en exception :
 * l'appelant affiche alors le message « connexion impossible ».
 */
export async function sendContactMessage(
  input: ContactMessage,
  options: { signal?: AbortSignal } = {},
): Promise<SubmitOutcome> {
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: web3formsAccessKey,
      subject: input.subject,
      from_name: site.brand,
      name: input.name,
      email: input.email,
      message: input.message,
    }),
    signal: options.signal,
  });

  const payload: unknown = await response.json().catch(() => null);

  if (response.ok && isAccepted(payload)) {
    return { status: "success" };
  }

  if (response.status === 429) {
    return { status: "rate-limited" };
  }

  // Conservé pour le diagnostic local : la réponse brute est utile en console.
  if (process.env.NODE_ENV !== "production") {
    console.warn("Web3Forms a refusé l'envoi :", response.status, readServerMessage(payload));
  }

  return { status: "rejected" };
}
