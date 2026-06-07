/**
 * Wraps a next-themes setTheme call with the View Transitions API so the
 * circle-blur CSS effect in globals.css fires on every theme change.
 * Falls back to an instant swap on browsers that don't support transitions.
 */
export function setThemeWithTransition(
  setTheme: (theme: string) => void,
  next: string,
) {
  if (typeof document === "undefined" || !document.startViewTransition) {
    setTheme(next);
    return;
  }
  document.startViewTransition(() => setTheme(next));
}
