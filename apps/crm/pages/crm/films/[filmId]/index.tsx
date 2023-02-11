import CRMContainer from 'crmui/containers/shell/CRMContainer';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
import { PageProvider } from 'crmui/contexts/page/PageContext';
import { useRouter } from 'next/router';
import { useFilm, useVideoFiles, useVideos, Video, VideoFile } from '@modules/api';
import { FilmInfoCard } from 'crmui/elements/forms/FilmForm';
import Head from 'next/head';
import { SeasonsContainer } from 'crmui/elements/video/Seasons';
import { CardForm } from 'crmui/elements/forms/Form';
import { Box, Button, CardActions, CardContent } from '@mui/material';
import paths from 'crmui/routes/paths';
import {
  makeVideoFilesUrlsForPlayer,
  PlayerJS,
  PlayerJSFolder,
} from '@modules/videoplayer';
import { useMemo } from 'react';
import * as R from 'ramda';
import Script from 'next/script';

function groupBySeason<T extends Video>(videos: T[]): Record<string, T[]> {
  return R.groupBy(R.prop<string>('season'), videos);
}
interface VideoWithVideoFiles extends Video {
  videoFiles: VideoFile[];
}

function useVideoWithVideoFiles(
  videos?: Video[],
  videoFiles?: VideoFile[]
): VideoWithVideoFiles[] {
  return useMemo(() => {
    if (!videos) {
      return [];
    }
    return videos.map((video) => {
      let videoFilesForVideo: VideoFile[] = [];
      if (videoFiles) {
        videoFilesForVideo = videoFiles.filter(
          (videoFile) => videoFile.video === video.id
        );
      }
      return { ...video, videoFiles: videoFilesForVideo };
    }, []);
  }, [videoFiles, videos]);
}

const FilmsPage: React.FC = () => {
  const router = useRouter();
  const { filmId } = router.query;
  const { film, mutateFilm } = useFilm(filmId);
  const { videos } = useVideos({ film: String(filmId) });
  const videoFilesFilters = useMemo(
    () => (videos ? { video: videos.map((v) => v.id).join(',') } : null),
    [videos]
  );
  const { videoFiles, mutateVideoFiles, isVideoFilesLoading } =
    useVideoFiles(videoFilesFilters);
  const videosWithVideoFiles = useVideoWithVideoFiles(videos, videoFiles);
  const videoFolders = useMemo(() => {
    if (!videoFiles?.length) {
      return '';
    }
    const grouppedBySeasons = groupBySeason(videosWithVideoFiles);
    return Object.entries(grouppedBySeasons).map(([season, videos]) => ({
      title: `Сезон ${season}`,
      folder: videos.map((video) => ({
        title: `Серия ${video.series}`,
        file: makeVideoFilesUrlsForPlayer(video.videoFiles),
      })),
    }));
  }, [videoFiles?.length, videosWithVideoFiles]);
  return (
    <PageProvider title={`Фильм "${film?.name || ''}"`}>
      <Script src="/playerjs.js" type="text/javascript" async />
      <Head>
        <title>{film?.name}</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gridColumnGap: 12,
            gridRowGap: '1em',
          }}
        >
          <FilmInfoCard film={film} onSave={mutateFilm} />
          <CardForm title="Видеофайлы">
            <SeasonsContainer videos={videos || []}></SeasonsContainer>
            <Button
              onClick={() => router.push(paths.videoCreate({ filmId: filmId as string }))}
            >
              Добавить серию
            </Button>
          </CardForm>
          {!!videoFolders && <PlayerJS id="player" file={videoFolders} />}
        </Box>
      </CRMContainer>
    </PageProvider>
  );
};

export default FilmsPage;
