"use client";

import { useEffect } from "react";

import { bindSounds } from "@/lib/sound";

/**
 * Wires the site's interaction sounds once: applies the saved on/off choice,
 * unlocks audio on the first gesture, and delegates every `data-sound*`
 * attribute on the page (including elements rendered later). Renders nothing,
 * so the tree it sits beside stays server-rendered.
 */
export function SoundProvider() {
  useEffect(() => bindSounds(), []);
  return null;
}
