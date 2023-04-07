import { useEffect, useRef } from "react";

export function useScript(url: string) {
  const scriptRef = useRef<HTMLScriptElement>();
  useEffect(() => {
    const script = document.createElement("script");
    scriptRef.current = script;
    script.src = url;
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
  return scriptRef.current;
}
