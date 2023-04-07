import React from "react";

export function useWasTrue(currentValue: boolean): boolean {
  // Always return false untill currentValue is true then always return true
  // Can be used for lazy loading. Don't render component untill it visible to user, then always render
  const [wasTrue, setWasTrue] = React.useState(currentValue);
  if (currentValue && !wasTrue) {
    setWasTrue(true);
  }
  return wasTrue || currentValue;
}

export function useBoolean(
  initial: boolean
): [
  boolean,
  { setFalse: () => void; setTrue: () => void; toggle: () => void }
] {
  const [isTrue, setIsTrue] = React.useState(initial);
  const setTrue = React.useCallback(() => setIsTrue(true), []);
  const setFalse = React.useCallback(() => setIsTrue(false), []);
  const toggle = React.useCallback(() => setIsTrue(!isTrue), [isTrue]);
  return [isTrue, { setTrue, setFalse, toggle }];
}
