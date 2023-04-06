export interface Video {
  readonly id: string;
  film: string;
  season: number;
  series: number;
}

export interface FileForVideo {
  readonly id: string;
  video: string;
  file: string | null;
}
