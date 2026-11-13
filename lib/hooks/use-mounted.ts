import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns `false` during SSR and hydration, then `true` on the client.
 *
 * Unlike a `useEffect` + `useState` pair, this lets React handle the
 * server/client difference without a cascading render after mount.
 */
export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
