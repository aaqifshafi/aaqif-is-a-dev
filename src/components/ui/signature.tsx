"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { parse as parseFont } from "opentype.js";
import { cn } from "@/lib/utils";
import { duration as motionDuration, easeFluid } from "@/lib/motion";

/** Self-hosted script font the signature is traced from (lives in /public/fonts). */
const DEFAULT_FONT_URL = "/fonts/LastoriaBoldRegular.otf";

/** Gap between consecutive glyphs starting to draw, in seconds. */
const GLYPH_STAGGER = 0.2;

export type SignatureProps = {
  /** Text to render as a hand-drawn signature. */
  text?: string;
  /** Stroke / fill color. Defaults to `currentColor`, so theme it with a `text-*` token class. */
  color?: string;
  /** Font size in px. */
  fontSize?: number;
  /** Draw duration per glyph, in seconds. */
  duration?: number;
  /** Delay before the first glyph starts drawing, in seconds. */
  delay?: number;
  className?: string;
  /** Start drawing only once scrolled into view. */
  inView?: boolean;
  /** With `inView`, draw only the first time it enters the viewport. */
  once?: boolean;
  /** Override the font file (must be same-origin or CORS-enabled). */
  fontUrl?: string;
};

const drawVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

export function Signature({
  text = "Signature",
  color = "currentColor",
  fontSize = 32,
  duration = motionDuration.slow * 2.5,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl = DEFAULT_FONT_URL,
}: SignatureProps) {
  const reduceMotion = useReducedMotion() === true;
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const height = fontSize * 3;
  const horizontalPadding = fontSize * 0.1;
  const baseline = fontSize * 1.5;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const controller = new AbortController();
    const cancelled = () => controller.signal.aborted;

    fetch(fontUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status} for ${fontUrl}`);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        if (cancelled()) return;
        const font = parseFont(buffer);
        let x = horizontalPadding;
        const next: string[] = [];
        for (const char of text) {
          const glyph = font.charToGlyph(char);
          next.push(glyph.getPath(x, baseline, fontSize).toPathData(3));
          x += (glyph.advanceWidth ?? font.unitsPerEm) * (fontSize / font.unitsPerEm);
        }
        setPaths(next);
        setWidth(x + horizontalPadding);
      })
      .catch((error: unknown) => {
        if (cancelled()) return;
        console.error("Signature: failed to load font", error);
        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      });

    return () => controller.abort();
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  const transitionFor = (i: number) => ({
    pathLength: {
      delay: delay + i * GLYPH_STAGGER,
      duration,
      ease: easeFluid,
    },
    opacity: {
      delay: delay + i * GLYPH_STAGGER + 0.01,
      duration: 0.01,
    },
  });

  // Reduced motion: render the finished signature with no draw-on.
  const initial = reduceMotion ? "visible" : "hidden";
  const playInView = inView && !reduceMotion;

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      role="img"
      aria-label={text}
      className={cn("overflow-visible text-foreground", className)}
      initial={initial}
      whileInView={playInView ? "visible" : undefined}
      animate={playInView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="white"
              strokeWidth={fontSize * 0.22}
              fill="none"
              variants={drawVariants}
              transition={transitionFor(i)}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          variants={drawVariants}
          transition={transitionFor(i)}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) => (
          <path key={i} d={d} fill={color} />
        ))}
      </g>
    </motion.svg>
  );
}
