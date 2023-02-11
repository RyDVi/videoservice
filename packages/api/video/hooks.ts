import { useRequest } from "../base";
import { Video } from "./types";
import useSwr from "swr";
import { video } from "./endpoints";

export function useSaveVideo(initial?: Partial<Video> | null) {
  const {
    data,
    request: saveVideo,
    loading: isSaveVideoLoading,
    setData: setVideo,
    error: errorOfSaveVideo,
  } = useRequest({
    initial: video.getInitial(initial),
    config: video.save,
  });
  return {
    video: data,
    saveVideo,
    isSaveVideoLoading,
    setVideo,
    errorOfSaveVideo,
  };
}

export function useVideos(filters: Parameters<typeof video.list>[0]) {
  const { data, error, mutate } = useSwr<Video[]>([
    video.list(filters).url,
    video.list(filters),
  ]);
  const isVideosLoading = !data && !error;
  return {
    videos: data,
    videosErrors: error,
    mutateVideos: mutate,
    isVideosLoading,
  };
}

export function useVideo(id?: string | string[]) {
  const { data, error, mutate } = useSwr<Video>(video.retrieve(id).url);
  const isVideoLoading = !data && !error;
  return {
    video: data,
    videoErrors: error,
    mutateVideo: mutate,
    isVideoLoading,
  };
}

export function useDeleteVideo(id?: string | string[]) {
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: video.destroy,
  });
  return {
    deleteVideo: request,
    isDeletingVideo: loading,
    errorOfDeleteVideo: error,
  };
}
