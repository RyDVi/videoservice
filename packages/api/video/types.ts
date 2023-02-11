export interface Video {
  readonly id: string;
  film: string;
  type: "film" | "serial";
  season: number;
  series: number;
}

export const VIDEO_TYPES = {
  film: "Фильм",
  serial: "Серия",
};

export interface FileForVideo {
  readonly id: string;
  video: string;
  file: string | null;
}
