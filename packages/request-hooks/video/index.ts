import { useAxiosRequest } from "../axios";
import { Video, video } from "@modules/api";
import useSwr from "swr";

export function useSaveVideo(initial?: Partial<Video> | null) {
  const {
    data,
    request: saveVideo,
    loading: isSaveVideoLoading,
    setData: setVideo,
    error: errorOfSaveVideo,
  } = useAxiosRequest({
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

export function useVideos(filters: Parameters<typeof video.list>[0] | null) {
  const { data, error, mutate } = useSwr<Video[]>(
    filters ? [video.list(filters).url, video.list(filters)] : null
  );
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
  const { loading, request, setData, error, response } = useAxiosRequest({
    initial: id,
    config: video.destroy,
  });
  return {
    deleteVideo: request,
    isDeletingVideo: loading,
    errorOfDeleteVideo: error,
  };
}
