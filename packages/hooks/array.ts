import React from "react";
import { useUncontrolled } from "./state";

export interface ArrayFunctions<T> {
  items: T[];
  removeByIndex: (i: number) => void;
  toggle: (item: T) => boolean;
  isPresent: (item: T) => boolean;
  addIfNotExist: (item: T) => void;
  clear: () => void;
  pushMany: (items: T[], uniqueOnly?: boolean) => void;
  setItems: (items: T[]) => void;
  setItem: (item: T, index: number) => void;
  push: (item: T) => void;
}

export function getArrayFunctions<T>(
  arrItems: T[],
  change: (items: T[]) => void
): ArrayFunctions<T> {
  const removeByIndex = (index: number) => {
    change([...arrItems.slice(0, index), ...arrItems.slice(index + 1)]);
  };
  const isPresent = (item: T) => arrItems.includes(item);
  const addIfNotExist = (item: T) => {
    if (!isPresent(item)) {
      change([...arrItems, item]);
    }
  };
  const toggle = (item: T) => {
    // returns "added" flag
    if (isPresent(item)) {
      change(arrItems.filter((x) => x !== item));
      return false;
    } else {
      change([...arrItems, item]);
      return true;
    }
  };
  const pushMany = (items: T[], uniqueOnly?: boolean) => {
    let newItems = items;
    if (uniqueOnly) {
      const existing = new Set(arrItems);
      // TOOD: Нужно проверить это. До этого это было [...new Set(items)]
      newItems = Array.from(new Set(items)).filter((x) => !existing.has(x));
    }
    change([...arrItems, ...newItems]);
  };
  const push = (item: T) => {
    change([...arrItems, item]);
  };
  const setItem = (item: T, index: number) => {
    change([...arrItems.slice(0, index), item, ...arrItems.slice(index + 1)]);
  };
  return {
    items: arrItems,
    removeByIndex,
    toggle,
    isPresent,
    addIfNotExist,
    clear: () => change([]),
    pushMany,
    setItems: change,
    setItem,
    push,
  } as ArrayFunctions<T>;
}

// function useArray<T>(items: T[], onChange: (items: T[]) => void): ArrayFunctions<T>;
// function useArray<T>(items: T[]): ArrayFunctions<T>;
function useArray<T>(
  items: T[],
  onChange?: (items: T[]) => void
): ArrayFunctions<T> {
  const [arrItems, change] = useUncontrolled(items, onChange);
  return React.useMemo(
    () => getArrayFunctions(arrItems, change),
    [arrItems, change]
  );
}
export { useArray };
