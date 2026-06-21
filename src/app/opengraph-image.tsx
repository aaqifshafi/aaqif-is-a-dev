import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Aaqif Shafi — Full-Stack Product Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SAFE_AREA = 72;

// Design system dark-theme tokens
const BG      = "#0e0e0e";
const PRIMARY = "#ffffff";
const MUTED   = "#c4c7c8";
const SUBTLE  = "#444748";
const GRID    = "rgba(255,255,255,0.035)";

export default async function OpengraphImage() {
  const [geistSansBold, geistMonoRegular, geistPixelSquare] = await Promise.all([
    readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
    readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/GeistPixel-Square.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: BG,
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(to right, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          padding: SAFE_AREA,
          fontFamily: "GeistMono",
        }}
      >
        {/* Top — name + role */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistPixel",
              fontSize: 96,
              fontWeight: 400,
              color: PRIMARY,
              letterSpacing: "2px",
              lineHeight: 1,
            }}
          >
            AAQIF SHAFI
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 26,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: "0.02em",
            }}
          >
            Full-Stack Product Engineer
          </div>
        </div>

        {/* Middle — main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontFamily: "GeistSans",
              fontSize: 64,
              fontWeight: 700,
              color: PRIMARY,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            I build products from idea to production.
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 24,
              fontWeight: 400,
              color: MUTED,
              letterSpacing: "0.04em",
            }}
          >
            Frontend · Backend · Cloud & AI
          </div>
        </div>

        {/* Bottom — URL right-aligned */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "GeistMono",
              fontSize: 20,
              fontWeight: 400,
              color: SUBTLE,
              letterSpacing: "0.04em",
            }}
          >
            aaqif.is-a.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "GeistSans",  data: geistSansBold,     weight: 700, style: "normal" },
        { name: "GeistMono",  data: geistMonoRegular,   weight: 400, style: "normal" },
        { name: "GeistPixel", data: geistPixelSquare,   weight: 400, style: "normal" },
      ],
    },
  );
}
