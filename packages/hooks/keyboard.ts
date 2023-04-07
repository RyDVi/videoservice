import { isCtrlEnter } from "@modules/utils";
import React from "react";

export function useCtrlEnter(callback: () => void) {
  return React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (isCtrlEnter(event)) {
        callback();
      }
    },
    [callback]
  );
}
