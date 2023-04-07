import { useCallback, useRef } from "react";

export function useIsValueChanged<T>(currentVal: T) {
  const prevRef = useRef(currentVal);
  return useCallback(() => {
    if (prevRef.current !== currentVal) {
      prevRef.current = currentVal;
      return true;
    }
    return false;
  }, [currentVal]);
}
