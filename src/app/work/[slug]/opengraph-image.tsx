import { ImageResponse } from "next/og";
import { loadOgFonts, OG } from "@/lib/og-fonts";
import { work } from "@/lib/portfolio-data";

export const runtime = "nodejs";
export const alt = "Work — Aaqif Shafi";
export const size = { width: OG.W, height: OG.H };
export const contentType = "image/png";

type Params = { slug: string };

export default async function WorkOpengraphImage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = work.find((p) => p.slug === slug);
  const fonts = await loadOgFonts();

  const company  = project?.company  ?? "Work";
  const role     = project?.role     ?? "";
  const period   = project?.period   ?? "";
  const blurb    = project?.blurb    ?? "";
  const truncated = blurb.length > 120 ? blurb.slice(0, 118) + "…" : blurb;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: OG.BG,
          backgroundImage: `linear-gradient(${OG.GRID} 1px, transparent 1px), linear-gradient(to right, ${OG.GRID} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          padding: OG.SAFE,
          fontFamily: "GeistMono",
        }}
      >
        {/* Top — attribution */}
        <div
          style={{
            display: "flex",
            fontFamily: "GeistPixel",
            fontSize: 40,
            fontWeight: 400,
            color: OG.SUBTLE,
            letterSpacing: "2px",
            lineHeight: 1,
          }}
        >
          AAQIF SHAFI
        </div>

        {/* Middle — project name + role + blurb */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistPixel",
              fontSize: 80,
              fontWeight: 400,
              color: OG.PRIMARY,
              letterSpacing: "2px",
              lineHeight: 1,
            }}
          >
            {company.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 24,
              fontWeight: 400,
              color: OG.MUTED,
              letterSpacing: "0.02em",
            }}
          >
            {role} · {period}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 20,
              fontWeight: 400,
              color: OG.SUBTLE,
              letterSpacing: "0.02em",
              lineHeight: 1.5,
              maxWidth: 920,
            }}
          >
            {truncated}
          </div>
        </div>

        {/* Bottom — URL */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 20,
              fontWeight: 400,
              color: OG.SUBTLE,
              letterSpacing: "0.04em",
            }}
          >
            aaqif.is-a.dev/work/{slug}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
