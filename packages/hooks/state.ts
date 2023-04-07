import React from "react";

const LOCKS: Record<string, boolean> = {};
/**
 * Calls a callback, but only once per lockKey
 */
export const useCallOnce = (lockKey: string | null, callback: () => void) => {
  if (lockKey && !LOCKS[lockKey]) {
    LOCKS[lockKey] = true;
    callback();
  }
};

/**
 * If onChange defined then is controlled state and will be used outside (input) properties
 * If onChange is not defined then is uncontrolled properties and will be used insider useState. And item it's initialValue
 */
export function useUncontrolled<T>(
  item: T,
  onChange?: (item: T) => void
): [T, (item: T) => void] {
  const controlled = !!onChange;
  const [state, setState] = React.useState<T>(item);
  if (controlled) {
    return [item, onChange];
  }
  return [state, setState];
}

export function useForceUpdate() {
  return React.useReducer((x: number) => x + 1, 1);
}
