import { readFile } from "fs/promises";
import path from "path";

export async function loadOgFonts() {
  const [geistSansBold, geistMonoRegular, geistPixelSquare] = await Promise.all([
    readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-sans/Geist-Bold.ttf")),
    readFile(path.join(process.cwd(), "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/GeistPixel-Square.ttf")),
  ]);

  return [
    { name: "GeistSans",  data: geistSansBold,    weight: 700 as const, style: "normal" as const },
    { name: "GeistMono",  data: geistMonoRegular,  weight: 400 as const, style: "normal" as const },
    { name: "GeistPixel", data: geistPixelSquare,  weight: 400 as const, style: "normal" as const },
  ];
}

// Shared design tokens (dark theme)
export const OG = {
  BG:      "#0e0e0e",
  PRIMARY: "#ffffff",
  MUTED:   "#c4c7c8",
  SUBTLE:  "#444748",
  GRID:    "rgba(255,255,255,0.035)",
  SAFE:    72,
  W:       1200,
  H:       630,
} as const;
