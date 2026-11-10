"use client";

import { IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { WorkVideo as WorkVideoData } from "@/types/portfolio";

export type WorkVideoProps = {
  video: WorkVideoData;
  /** Accessible description of what the clip shows. */
  label: string;
  /** Start fetching immediately (true for an above-the-fold hero). */
  priority?: boolean;
  className?: string;
};

/**
 * A silent, looping product clip that plays inline while it's on screen.
 *
 * - Sources are listed best-codec first (AV1, then H.264), so each browser
 *   picks the smallest file it can decode.
 * - It only downloads once it nears the viewport, and pauses when off screen.
 * - Under `prefers-reduced-motion` it stays on its poster until asked to play.
 * - A pause/play control satisfies WCAG 2.2.2 (moving content longer than 5s
 *   must be pausable). It's always visible on touch screens, and appears on
 *   hover or keyboard focus elsewhere. A user's choice wins over autoplay.
 *
 * Fills its parent stage, which must be `relative`.
 */
export function WorkVideo({ video, label, priority, className }: WorkVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  /** null = no choice yet (follow autoplay rules); true/false = user override. */
  const [userWantsPlay, setUserWantsPlay] = useState<boolean | null>(null);
  const [playing, setPlaying] = useState(false);
  const shouldAutoplay = userWantsPlay ?? !reduce;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!shouldAutoplay) {
      el.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Autoplay can be refused (e.g. Low Power Mode); the poster stays up.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldAutoplay]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    // Act on the element directly too: if autoplay was refused, flipping state
    // alone wouldn't re-run the effect, and the click would appear to do nothing.
    if (playing) el.pause();
    else el.play().catch(() => {});
    setUserWantsPlay(!playing);
  };

  return (
    <>
      <video
        ref={ref}
        poster={video.poster}
        width={video.width}
        height={video.height}
        aria-label={label}
        muted
        loop
        playsInline
        disablePictureInPicture
        preload={priority ? "auto" : "none"}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn("absolute inset-0 size-full object-cover", className)}
      >
        {video.sources.map((source) => (
          <source key={source.src} src={source.src} type={source.type} />
        ))}
      </video>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className={cn(
          "absolute right-3 bottom-3 z-10 flex size-8 cursor-pointer items-center justify-center rounded-full",
          "border border-border bg-background/80 text-primary backdrop-blur-sm",
          "transition-[opacity,transform] duration-150 ease-snappy active:scale-[0.97]",
          "focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          // Touch screens can't hover, so keep it visible there; reveal on hover elsewhere.
          // It also stays visible whenever the video is paused, so "Play" is never hidden.
          playing &&
            "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100",
        )}
      >
        {playing ? (
          <IconPlayerPauseFilled className="size-3.5" aria-hidden />
        ) : (
          <IconPlayerPlayFilled className="size-3.5" aria-hidden />
        )}
      </button>
    </>
  );
}
