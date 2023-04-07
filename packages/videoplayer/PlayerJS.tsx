import React, { useRef } from "react";

function removePlayerJs(playerOrPlayerId: string | PlayerJSProps) {
  // TODO: need implement
  const playerId =
    typeof playerOrPlayerId === "string"
      ? playerOrPlayerId
      : playerOrPlayerId.id;
}

interface PlayerJSSeria {
  title: string;
  file?: string;
  poster?: string; // image URL
  subtitle?: string; // subtitle URL
  folder?: string; // folder object
  id?: string; // ID for file search
}

export interface PlayerJSFolder {
  title: string;
  folder?: PlayerJSSeria[];
}

interface PlayerJSProps {
  id: string;
  file?: string | null | PlayerJSSeria[] | PlayerJSFolder[];
  poster?: string;
  title?: string;
  autoplay?: 1 | 0;
  start?: number;
  end?: number;
  duration?: number;
  subtitle?: string;
  qualities?: string; //"360p,480p,720p,1080p" и т.д.
  default_quality?: string; //Один из вариантов, предоставленный в qualities
}

// Format for file: "[качество_видео]{наименование_студии}ссылка_до_файла..."

export const PlayerJS: React.FC<PlayerJSProps> = (config) => {
  const playerRef = useRef<PlayerJSProps>();
  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }
    const Playerjs = (window as any).Playerjs;
    if (Playerjs) {
      playerRef.current = new Playerjs(config);
    } else {
      const pjscnfgs = (window as any).pjscnfgs;
      if (!pjscnfgs) {
        (window as any).pjscnfgs = {};
      }
      (window as any).pjscnfgs[config.id] = config;
    }
    return () => {
      if (playerRef.current) {
        removePlayerJs(playerRef.current);
      }
    };
  }, [config]);
  return <div id={config.id}></div>;
};
