let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  ctx ??= new Ctor();
  return ctx;
}

/**
 * A soft, short UI "tick" for the theme toggle — synthesized so no asset is shipped.
 * `up` (switching to light) plays a brighter rising pitch; dark plays a lower falling one.
 * Must be called from a user gesture (the toggle click) so the AudioContext can start.
 */
export function playToggleSound(up: boolean): void {
  const audio = getContext();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();

  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const gain = audio.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(up ? 620 : 480, now);
  osc.frequency.exponentialRampToValueAtTime(up ? 920 : 320, now + 0.07);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.045, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);

  osc.connect(gain).connect(audio.destination);
  osc.start(now);
  osc.stop(now + 0.18);
}
