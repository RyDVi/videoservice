import { FileForVideo } from "../types";

export interface VideoFile extends FileForVideo {
  resolution: 360 | 480 | 720 | 1080 | 2160;
  sound_studio: string;
}
