import React from "react";

export function useTimeout(handler: () => void, delaySeconds: number) {
  React.useEffect(() => {
    const timeout = setTimeout(handler, delaySeconds * 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [delaySeconds, handler]);
}
