import { AxiosProgressEvent, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import useSwr from "swr";
import { axiosInstance, RequestError, SaveEndpoint, useRequest } from "../base";
import { VideoFile } from "./types";

export function useUploadVideoFile(initialVideoFile: VideoFile) {
  const [src, setSrc] = useState(initialVideoFile.file || "");
  const [errorOfUploadVideoFile, setError] = useState<File | null>();
  const [uploadProgress, setUploadProgress] =
    useState<AxiosProgressEvent | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const upload = useCallback(() => {
    if (!videoFile) return {};
    const formData = new FormData();
    formData.append("file", videoFile);
    return axiosInstance
      .put(videofilesEndpoint.uploadVideo(initialVideoFile).url, formData, {
        ...videofilesEndpoint.uploadVideo(initialVideoFile),
        onUploadProgress: setUploadProgress,
      })
      .then((response) => {
        setVideoFile(null);
        setSrc(response.data.file);
        return response;
      })
      .catch((error: RequestError<File>) => {
        setError(error.data);
        throw error.data;
      });
  }, [initialVideoFile, videoFile]);

  const { saveVideoFile } = useSaveVideoFile(initialVideoFile);

  const deleteFileOfVideo = useCallback(() => {
    if (videoFile) {
      setVideoFile(null);
      return;
    }
    if (!src) {
      return;
    }
    saveVideoFile({ ...initialVideoFile, file: null }).then(
      (response: AxiosResponse<VideoFile>) => {
        setSrc(response.data.file || "");
      }
    );
  }, [initialVideoFile, saveVideoFile, src, videoFile]);

  const isUploadingVideoFile =
    !!uploadProgress?.progress && uploadProgress.progress < 1;
  return {
    upload,
    uploadProgress,
    videoFile,
    setVideoFile,
    isUploadingVideoFile,
    errorOfUploadVideoFile,
    src,
    deleteFileOfVideo,
  };
}

export function useSaveVideoFile(initial?: Partial<VideoFile> | null) {
  const { data, request, loading, setData, error } = useRequest({
    initial: videofilesEndpoint.getInitial(initial),
    config: videofilesEndpoint.save,
  });
  return {
    videoFile: data,
    saveVideoFile: request,
    isSaveVideoFile: loading,
    setVideoFile: setData,
    errorOfSaveVideoFile: error,
  };
}

export function useVideoFile(id?: string | string[]) {
  const { data, error, mutate } = useSwr<VideoFile>(
    videofilesEndpoint.retrieve(id).url
  );
  const isVideoFileLoading = !data && !error;
  return {
    videoFile: data,
    videoFileErrors: error,
    mutateVideoFile: mutate,
    isVideoFileLoading,
  };
}

export function useVideoFiles(
  filters: Parameters<typeof videofilesEndpoint.list>[0] | null
) {
  const { data, error, mutate } = useSwr<VideoFile[]>(
    filters ? [videofilesEndpoint.list(filters).url, videofilesEndpoint.list(filters)] : null
  );
  const isVideoFilesLoading = !data && !error;
  return {
    videoFiles: data,
    videoFilesErrors: error,
    mutateVideoFiles: mutate,
    isVideoFilesLoading,
  };
}

export function useDeleteVideoFile(id?: string | string[]) {
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: videofilesEndpoint.destroy,
  });
  return {
    deleteVideoFile: request,
    isDeletingVideoFile: loading,
    errorOfDeleteVideoFile: error,
  };
}

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

export const videofilesEndpoint = new VideoFilesEndpoint("/videofiles/");
const api = { videofiles:videofilesEndpoint };
export default api;
