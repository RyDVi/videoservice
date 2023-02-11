import { SaveEndpoint, useRequest } from '../base';
import { Video } from './types';
import useSwr from 'swr';
import videofiles from './videoFileEndpoints';
import subtitlefiles from './subtitleFileEndpoints';

export function useSaveVideo(initial?: Partial<Video> | null) {
  const {
    data,
    request: saveVideo,
    loading: isSaveVideoLoading,
    setData: setVideo,
    error: errorOfSaveVideo,
  } = useRequest({
    initial: videos.getInitial(initial),
    config: videos.save,
  });
  return { video: data, saveVideo, isSaveVideoLoading, setVideo, errorOfSaveVideo };
}

export function useVideos(filters: Parameters<typeof videos.list>[0]) {
  const { data, error, mutate } = useSwr<Video[]>([
    videos.list(filters).url,
    videos.list(filters),
  ]);
  const isVideosLoading = !data && !error;
  return { videos: data, videosErrors: error, mutateVideos: mutate, isVideosLoading };
}

export function useVideo(id?: string | string[]) {
  const { data, error, mutate } = useSwr<Video>(videos.retrieve(id).url);
  const isVideoLoading = !data && !error;
  return { video: data, videoErrors: error, mutateVideo: mutate, isVideoLoading };
}

export function useDeleteVideo(id?: string | string[]) {
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: videos.destroy,
  });
  return {
    deleteVideo: request,
    isDeletingVideo: loading,
    errorOfDeleteVideo: error,
  };
}

class VideoEndpoint extends SaveEndpoint<Video> {
  getInitial = (video?: Partial<Video> | null): Video => ({
    id: '',
    film: '',
    season: 1,
    series: 1,
    type: 'film',
    ...video,
  });
}

const videos = new VideoEndpoint('/video/');

const api = {
  videos,
  videofiles,
  subtitlefiles,
};
export default api;
