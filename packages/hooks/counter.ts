import React from "react";
import { useUncontrolled } from "./state";

export interface Counter {
  value: number;
  increment: () => void;
  decrement: () => void;
  setValue: (value: number) => void;
}

export function useCounter(
  initialValue?: number,
  onChange?: (value: number) => void
): Counter {
  const [value, setValue] = useUncontrolled(initialValue || 0, onChange);

  const increment = React.useCallback(
    () => setValue(value + 1),
    [setValue, value]
  );
  const decrement = React.useCallback(
    () => setValue(value - 1),
    [setValue, value]
  );

  return {
    value,
    increment,
    decrement,
    setValue,
  };
}

export function useRange(
  initialValue?: number,
  onChange?: (value: number) => void,
  min = 0,
  max = 0
): Counter {
  const {
    value,
    increment: counterIncrement,
    decrement: counterDecrement,
    setValue,
    ...restCounterProps
  } = useCounter(initialValue, onChange);
  const increment = React.useCallback(() => {
    if (value < max) {
      counterIncrement();
    } else {
      setValue(max);
    }
  }, [value, max, counterIncrement, setValue]);

  const decrement = React.useCallback(() => {
    if (value > min) {
      counterDecrement();
    } else {
      setValue(min);
    }
  }, [value, min, counterDecrement, setValue]);

  return { value, increment, decrement, setValue, ...restCounterProps };
}
