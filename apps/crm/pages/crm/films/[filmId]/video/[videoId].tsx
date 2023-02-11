import {
  CRMContainer,
  CrmSidebar,
  CardForm,
  AddElementCard,
  CreateEditSubtitleFileForm,
  SubtitleFileInfoCard,
  PageProvider,
  VideoInfoCard,
  CreateEditVideoFileForm,
  VideoFileInfoCard,
} from "crmui";
import { useRouter } from "next/router";
import {
  useFilm,
  useSubtitleFiles,
  useVideo,
  useVideoFiles,
  api,
} from "@modules/api";
import Head from "next/head";
import { Box, Card, CardContent, CardHeader, Icon } from "@mui/material";
import { makeVideoFilesUrlsForPlayer, PlayerJS } from "@modules/videoplayer";
import { useMemo } from "react";
import Script from "next/script";

const FilmsPage: React.FC = () => {
  const router = useRouter();
  const { filmId, videoId } = router.query;
  const { film } = useFilm(filmId);
  const { video, mutateVideo } = useVideo(videoId);
  const { videoFiles, mutateVideoFiles, isVideoFilesLoading } = useVideoFiles({
    video: videoId as string,
  });
  const { subtitleFiles, mutateSubtitleFiles } = useSubtitleFiles({
    video: videoId as string,
  });

  const playerjsFilms = useMemo(() => {
    if (!videoFiles?.length) {
      return "";
    }
    return makeVideoFilesUrlsForPlayer(videoFiles);
  }, [videoFiles]);
  return (
    <PageProvider
      title={`Фильм "${film?.name || ""}". Сезон ${video?.season}. Серия ${
        video?.series
      }.`}
    >
      <Script src="/playerjs.js" type="text/javascript" async />
      <Head>
        <title>{film?.name}</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <Box>
          <Card sx={{ mb: 1, width: "60%" }}>
            <CardHeader title="Превью видео (как у пользователя)" />
            <CardContent>
              {!isVideoFilesLoading && (
                <PlayerJS id="player" file={playerjsFilms} />
              )}
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
              gridColumnGap: 12,
              gridRowGap: "1em",
            }}
          >
            <VideoInfoCard data={video} onSave={mutateVideo} />
            {videoFiles?.map((videoFile) => (
              <VideoFileInfoCard
                key={videoFile.id}
                videoFile={videoFile}
                onSave={() => null}
                onDelete={(data) =>
                  mutateVideoFiles(videoFiles.filter((v) => v.id !== data.id))
                }
              />
            ))}
            <AddElementCard title="Добавить видеофайл">
              {({ toAdd }) => (
                <CardForm title="Создание видеофайла">
                  <CreateEditVideoFileForm
                    onSave={(newVideoFile) => {
                      toAdd();
                      mutateVideoFiles([...(videoFiles || []), newVideoFile]);
                    }}
                    onCancel={toAdd}
                    data={api.videofiles.getInitial({
                      video: videoId as string,
                    })}
                  />
                </CardForm>
              )}
            </AddElementCard>
            {/* TODO: Need preview for subtitles and check upload */}
            {subtitleFiles?.map((subtitleFile) => (
              <SubtitleFileInfoCard
                key={subtitleFile.id}
                subtitleFile={subtitleFile}
                onSave={() => null}
                onDelete={(data) =>
                  mutateSubtitleFiles(
                    subtitleFiles.filter((v) => v.id !== data.id)
                  )
                }
              />
            ))}
            <AddElementCard title="Добавить субтитры">
              {({ toAdd }) => (
                <CardForm title="Создание субтитров">
                  <CreateEditSubtitleFileForm
                    onSave={(newSubtitleFile) => {
                      toAdd();
                      mutateSubtitleFiles([
                        ...(subtitleFiles || []),
                        newSubtitleFile,
                      ]);
                    }}
                    onCancel={toAdd}
                    data={api.subtitlefiles.getInitial({
                      video: videoId as string,
                    })}
                  />
                </CardForm>
              )}
            </AddElementCard>
          </Box>
        </Box>
      </CRMContainer>
    </PageProvider>
  );
};

export default FilmsPage;
