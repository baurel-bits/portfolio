import { ImageResponse } from "next/og";
import { defaultLocale, isLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export const alt = `${site.owner} — ${site.brand}, développeur junior frontend & logiciel`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpengraphImage({ params }: ImageProps) {
  const { locale } = await params;
  const active = isLocale(locale) ? locale : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          backgroundColor: "#0c0f0e",
          color: "#ecefe9",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#96a099",
          }}
        >
          <span>TEKER/Codes</span>
          <span>{site.location[active]}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
            {site.owner}
          </span>
          <span style={{ fontSize: 40, marginTop: 20, color: "#d6f24a" }}>
            {site.role[active]}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#96a099",
          }}
        >
          <span>{site.stackPreview.join(" · ")}</span>
          <span style={{ color: "#2d3bff", fontSize: 34 }}>→</span>
        </div>
      </div>
    ),
    size,
  );
}
