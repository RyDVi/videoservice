export interface Video {
  readonly id: string;
  film: string;
  type: 'film' | 'serial';
  season: number;
  series: number;
}

export const VIDEO_TYPES = {
  film: 'Фильм',
  serial: 'Серия',
};

export interface FileForVideo {
  readonly id: string;
  video: string;
  file: string | null;
}

export interface VideoFile extends FileForVideo {
  resolution: 360 | 480 | 720 | 1080 | 2160;
  sound_studio: string;
}

export interface SubtitleFile extends FileForVideo {
  studio_name: string;
}
