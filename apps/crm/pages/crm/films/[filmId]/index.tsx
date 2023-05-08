import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";
import { useRouter } from "next/router";
import { Video, VideoFile } from "@modules/api";
import {
  useCategories,
  useFilm,
  useFilmsPersons,
  useGenres,
  usePersonRoles,
  usePersons,
  useSaveFilm,
  useSaveFilmPerson,
  useVideoFiles,
  useVideos,
  useDeleteFilmPerson,
} from "@modules/axios-hooks";
import Head from "next/head";
import { Box, Button } from "@mui/material";
import { makeVideoFilesUrlsForPlayer, PlayerJS } from "@modules/videoplayer";
import { useMemo } from "react";
import * as R from "ramda";
import Script from "next/script";
import React from "react";
import * as paths from "src/paths";
import {
  CardForm,
  DictionariesMultiselect,
  FilmInfoCard,
  PersonRoleMultiselect,
} from "src/forms";
import { SeasonsContainer } from "src/elements";

function groupBySeason<T extends Video>(videos: T[]): Record<string, T[]> {
  return R.groupBy(R.prop<string>("season"), videos);
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

function FilmsPage() {
  const router = useRouter();
  const filmId = router.query.filmId as string;
  const { film, mutateFilm } = useFilm(filmId);
  const { videos } = useVideos(filmId ? { film: String(filmId) } : undefined);
  const videoFilesFilters = useMemo(
    () => (videos ? { video: videos.map((v) => v.id).join(",") } : undefined),
    [videos]
  );
  const { videoFiles } = useVideoFiles(videoFilesFilters);
  const videosWithVideoFiles = useVideoWithVideoFiles(videos, videoFiles);
  const videoFolders = useMemo(() => {
    if (!videoFiles?.length) {
      return "";
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

  const { categories } = useCategories({});

  const filmCategories = React.useMemo(
    () =>
      categories?.filter((category) => film?.categories.includes(category.id)),
    [categories, film?.categories]
  );

  const { genres } = useGenres({});
  const filmGenres = React.useMemo(
    () => genres?.filter((genre) => film?.genres.includes(genre.id)),
    [film?.genres, genres]
  );

  const { persons } = usePersons({});
  const { personRoles } = usePersonRoles({});
  const { filmsPersons, mutateFilmsPersons } = useFilmsPersons(
    film ? { film: film?.id } : undefined
  );
  const { saveFilmPerson } = useSaveFilmPerson();
  const { deleteFilmPerson } = useDeleteFilmPerson();

  const { saveFilm } = useSaveFilm();
  useCrmPageTitle(`Фильм "${film?.name || ""}"`);
  return (
    <>
      <Script src="/playerjs.js" type="text/javascript" async />
      <Head>
        <title>{film?.name}</title>
      </Head>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gridColumnGap: 12,
          gridRowGap: "1em",
        }}
      >
        <FilmInfoCard film={film} onSave={mutateFilm} />
        <CardForm title="Видеофайлы">
          <SeasonsContainer
            videos={videos || []}
            toSeria={(seria) =>
              router.push(
                paths.video({
                  filmId: seria.video.film,
                  videoId: seria.video.id,
                })
              )
            }
          ></SeasonsContainer>
          <Button
            onClick={() =>
              router.push(paths.videoCreate({ filmId: filmId as string }))
            }
          >
            Добавить серию
          </Button>
        </CardForm>
        <CardForm title="Категории">
          {categories && filmCategories && film && (
            <DictionariesMultiselect
              data={filmCategories}
              possibleValues={categories}
              onAdd={(category) =>
                saveFilm({
                  ...film,
                  categories: [...film.categories, category.id],
                }).then((film) => mutateFilm(film.data))
              }
              onDelete={(category) =>
                saveFilm({
                  ...film,
                  categories: film.categories.filter(
                    (categoryId) => category.id !== categoryId
                  ),
                }).then((film) => mutateFilm(film.data))
              }
            />
          )}
        </CardForm>
        <CardForm title="Жанры">
          {genres && filmGenres && film && (
            <DictionariesMultiselect
              data={filmGenres}
              possibleValues={genres}
              onAdd={(genre) =>
                saveFilm({
                  ...film,
                  genres: [...film.genres, genre.id],
                }).then((film) => mutateFilm(film.data))
              }
              onDelete={(genre) =>
                saveFilm({
                  ...film,
                  genres: film.genres.filter((genreId) => genre.id !== genreId),
                }).then((film) => mutateFilm(film.data))
              }
            />
          )}
        </CardForm>
        {personRoles?.map((role) => (
          <CardForm key={role.id} title={role.name}>
            {persons && filmsPersons && film && (
              <PersonRoleMultiselect
                data={filmsPersons.filter(
                  (filmPerson) => filmPerson.role === role.id
                )}
                possibleValues={persons}
                onAdd={(person) =>
                  saveFilmPerson({
                    id: "",
                    film: film.id,
                    role: role.id,
                    person: person.id,
                  }).then((filmPerson) =>
                    mutateFilmsPersons([...filmsPersons, filmPerson.data])
                  )
                }
                onDelete={(filmPerson) =>
                  deleteFilmPerson(filmPerson.id).then(() =>
                    mutateFilmsPersons(
                      filmsPersons.filter((fp) => fp.id === filmPerson.id)
                    )
                  )
                }
                possibleRoles={[role]}
              />
            )}
          </CardForm>
        ))}
        {!!videoFolders.length && <PlayerJS id="player" file={videoFolders} />}
      </Box>
    </>
  );
}

FilmsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default FilmsPage;
