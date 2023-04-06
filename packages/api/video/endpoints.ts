import { SaveEndpoint } from "../base";
import { Video } from "./types";

class VideoEndpoint extends SaveEndpoint<Video, { film?: string }> {
  getInitial = (video?: Partial<Video> | null): Video => ({
    id: "",
    film: "",
    season: 1,
    series: 1,
    ...video,
  });
}

export const video = new VideoEndpoint("/video/");
