import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` during SSR and the first client paint, then `true` after hydration —
 * without calling setState inside an effect. Use to gate client-only reads (e.g. the
 * resolved theme) so server and client markup match.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
