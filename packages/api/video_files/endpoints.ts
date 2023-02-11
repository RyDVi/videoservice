import { SaveEndpoint } from "../base";
import { VideoFile } from "./types";

class VideoFilesEndpoint extends SaveEndpoint<VideoFile, { video?: string }> {
  getInitial = (videoFile?: Partial<VideoFile> | null): VideoFile => ({
    id: "",
    video: "",
    file: null,
    resolution: 480,
    sound_studio: "",
    ...videoFile,
  });

  uploadVideo = (videoFile: VideoFile | string) => {
    const id = typeof videoFile === "object" ? videoFile.id : videoFile;
    return {
      url: `${this.uri}${id}/upload_video/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "PUT",
    };
  };
}

export const videofiles = new VideoFilesEndpoint("/videofiles/");
