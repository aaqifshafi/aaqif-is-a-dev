import { defineSound, ensureReady, setMasterVolume, type PlayOptions } from "@web-kits/audio";

// The "Minimal" patch from the @web-kits/audio registry, installed with
// `bunx @web-kits/audio add minimal` (generated into .web-kits/, do not edit):
// ultra-short sine cues, 10–70ms, already quiet at the source.
import { minimal } from "../../.web-kits";

/**
 * The site's one sound system: @web-kits/audio playing the Minimal patch, a
 * persisted on/off preference (on by default), and one master level.
 *
 * Elements opt in with plain data attributes (so Server Components can carry
 * them), which `bindSounds()` delegates from the document:
 *   - `sound(name)`  → plays `name` on click (Enter/Space included)
 *   - `typeSound`    → a key press per edit keystroke in a text field
 * Outcomes that aren't clicks (sent, failed) call `play()` directly.
 * There are deliberately no hover sounds: they read as noise to most visitors.
 */

/** Master level, 0–1. The patch is already quiet; this only trims. */
export const SOUND_VOLUME = 1;

/** Minimum gap between keystroke sounds. */
const TYPE_THROTTLE_MS = 40;

const sounds = {
  tap: defineSound(minimal.tap),
  click: defineSound(minimal.click),
  "key-press": defineSound(minimal.keyPress),
  "toggle-on": defineSound(minimal.toggleOn),
  "toggle-off": defineSound(minimal.toggleOff),
  send: defineSound(minimal.send),
  success: defineSound(minimal.success),
  error: defineSound(minimal.error),
  "page-exit": defineSound(minimal.pageExit),
} as const;

export type SoundName = keyof typeof sounds;

const STORAGE_KEY = "aq:sound";
const listeners = new Set<() => void>();

let enabled = true;
/** True once the AudioContext is running. Until then nothing plays, so sounds
 *  never queue up and burst out together when the browser finally allows audio. */
let unlocked = false;

function readStored(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

/** Start audio from inside a user gesture. Resolves whether audio can now play. */
export async function unlockAudio(): Promise<boolean> {
  if (unlocked) return true;
  try {
    const ctx = await ensureReady();
    setMasterVolume(SOUND_VOLUME);
    unlocked = ctx.state === "running";
  } catch {
    unlocked = false;
  }
  return unlocked;
}

/** Play a named sound from the patch, if sound is on and audio is running. */
export function play(name: SoundName, options?: PlayOptions) {
  if (!enabled || !unlocked) return;
  sounds[name](options);
}

/** Turn sound on or off, persist it, and notify subscribers. */
export function setSoundEnabled(next: boolean) {
  enabled = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
  } catch {
    // storage blocked (private mode): the choice lasts for this page only
  }
  for (const listener of listeners) listener();
}

/** `useSyncExternalStore` wiring for the preference. */
export const soundPreference = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        enabled = readStored();
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: readStored,
  /** Sound is on by default, so the server renders the "on" state. */
  getServerSnapshot: () => true,
};

/** Click sound: spread onto a clickable element, e.g. `{...sound("tap")}`. */
export function sound(name: SoundName) {
  return { "data-sound": name };
}

/** Keystroke sound: spread onto a text input or textarea. */
export const typeSound = { "data-sound-type": "" } as const;

function isSoundName(value: string | null): value is SoundName {
  return value !== null && value in sounds;
}

/**
 * Applies the saved preference, unlocks audio on the first gesture, and
 * delegates every sound attribute on the page (including elements rendered
 * later). Call once on mount; returns the cleanup.
 */
export function bindSounds() {
  enabled = readStored();

  let lastType = 0;

  const onGesture = () => void unlockAudio();

  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest?.("[data-sound]");
    const name = el?.getAttribute("data-sound") ?? null;
    if (isSoundName(name)) play(name);
  };

  // Only keys that edit text, never in password fields, throttled.
  const onKeyDown = (e: KeyboardEvent) => {
    const el = e.target as HTMLElement | null;
    if (!el?.closest?.("[data-sound-type]")) return;
    if (el instanceof HTMLInputElement && el.type === "password") return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const edits = e.key.length === 1 || e.key === "Backspace" || e.key === "Delete" || e.key === "Enter";
    if (!edits) return;
    const now = performance.now();
    if (now - lastType < TYPE_THROTTLE_MS) return;
    lastType = now;
    play("key-press");
  };

  document.addEventListener("pointerdown", onGesture, { capture: true });
  document.addEventListener("keydown", onGesture, { capture: true });
  document.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeyDown);

  return () => {
    document.removeEventListener("pointerdown", onGesture, { capture: true });
    document.removeEventListener("keydown", onGesture, { capture: true });
    document.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeyDown);
  };
}
