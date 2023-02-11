import { SaveEndpoint } from "../base";
import { SubtitleFile } from "./types";

class SubtitleFilesEndpoint extends SaveEndpoint<SubtitleFile> {
  getInitial = (subtitleFile?: Partial<SubtitleFile> | null): SubtitleFile => ({
    id: "",
    video: "",
    file: null,
    studio_name: "",
    ...subtitleFile,
  });

  uploadSubtitle = (subtitleFile: SubtitleFile | string) => {
    const id =
      typeof subtitleFile === "object" ? subtitleFile.id : subtitleFile;
    return {
      url: `${this.uri}${id}/upload_subtitle/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "PUT",
    };
  };
}
export const subtitlefiles = new SubtitleFilesEndpoint("/subtitlefiles/");
