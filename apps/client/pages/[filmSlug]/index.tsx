import {
  Film,
  Genre,
  Person,
  PersonRole,
  useFilms,
  usePersonRoles,
  usePersons,
  useVideos,
  Video,
  VideoFile,
  api,
  useVideoFiles,
  useFilmsPersons,
  FilmPerson,
} from "@modules/api";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import StarIcon from "@mui/icons-material/Star";
import { COUNTRIES_MAP } from "@modules/constants";
import React from "react";
import { AppPage } from "../../src/AppPage";
import { makeVideoFilesUrlsForPlayer, PlayerJS } from "@modules/videoplayer";
import * as R from "ramda";
import { NotFound, NotFoundVideoFiles } from "@modules/client/notfound";
import { styled } from "@mui/material/styles";
import Script from "next/script";
import { formatFullName } from "@modules/utils";
import Head from "next/head";
import { useDictionariesContext } from "@modules/stores";

const ratingFormatter = (rating: number) => rating.toFixed(1);
const contentRatingFormatter = (contentRating: number) => `${contentRating}+`;

const FilmRating: React.FC<
  { rating: number } & React.HTMLAttributes<HTMLDivElement>
> = ({ rating, ...props }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      {...props}
    >
      <Typography fontSize="2rem">{ratingFormatter(rating)}</Typography>
      <StarIcon color="warning" fontSize="large" />
    </Box>
  );
};

function groupBy<T>(entries: T[], key: keyof T): Record<string, T[]> {
  return R.groupBy(R.prop<string>(key), entries);
}

function dictFromArray<T>(array: T[], key: keyof T): Record<string, T> {
  return Object.fromEntries(array.map((el) => [el[key], el]));
}

interface GenreListItemProps {
  genre: Genre;
}

const GenreListItem: React.FC<GenreListItemProps> = ({ genre }) => (
  <ListItem key={genre.id} disablePadding>
    <ListItemText secondary={genre.name} />
  </ListItem>
);

interface DetailsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  film?: Film | null;
  genres?: Genre[];
  persons?: Person[];
  personRoles?: PersonRole[];
  filmsPersons?: FilmPerson[];
}

const DetailsContent: React.FC<DetailsContentProps> = ({
  film,
  genres,
  persons,
  personRoles,
  filmsPersons,
  ...props
}) => {
  const personsByRole = React.useMemo(() => {
    if (!filmsPersons || !personRoles || !persons) {
      return {};
    }
    const filmsPersonsByRole = groupBy(filmsPersons, "role");
    return Object.fromEntries(
      Object.entries(filmsPersonsByRole).map(([roleId, filmsPersons]) => {
        const role = personRoles.find((pr) => pr.id === roleId)!;
        return [
          role.name,
          filmsPersons.map((fp) => ({
            ...fp,
            role,
            person: persons.find((p) => p.id === fp.person)!,
          })),
        ];
      })
    );
  }, [filmsPersons, personRoles, persons]);
  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        "@media(max-width: 1024px)": {
          minWidth: "100%",
        },
      }}
      {...props}
    >
      <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <Typography component="h1" variant="h3">
            {film ? (
              film.name
            ) : (
              <Skeleton>
                <span>Загрузка наименования фильма</span>
              </Skeleton>
            )}
          </Typography>
          {film?.original_name !== film?.name && (
            <Typography component="h2" variant="h5" color="GrayText">
              {film ? film.original_name : <Skeleton />}
            </Typography>
          )}
        </div>
        {/* <Box sx={{ marginLeft: "auto" }}>
          <FilmRating rating={9.1} />
        </Box> */}
      </Box>
      <Box sx={{ marginTop: "2rem" }}>
        <Typography component="p">
          {film ? (
            film.description_full
          ) : (
            <Skeleton>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                nesciunt voluptatibus incidunt sapiente illo. Rerum modi
                reprehenderit corrupti laboriosam porro dolorem, nesciunt,
                deserunt officiis, incidunt consequuntur doloremque consectetur
                exercitationem. Vero! Recusandae voluptatem, ratione odit earum
                ea esse consequuntur, praesentium veritatis sequi expedita nobis
                placeat incidunt vero libero eos iure consequatur voluptatum
                dolores eum! Quibusdam vero numquam alias, aliquid consequuntur
                nesciunt.
              </span>
            </Skeleton>
          )}
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <Box sx={{ maxWidth: 300 }}>
          <ListItem disablePadding>
            <ListItemText
              primary="Год"
              secondary={
                film ? (
                  film.year
                ) : (
                  <Skeleton>
                    <span>2023</span>
                  </Skeleton>
                )
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary="Страна"
              secondary={
                film ? (
                  COUNTRIES_MAP[film.country]
                ) : (
                  <Skeleton>
                    <span>Россия</span>
                  </Skeleton>
                )
              }
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemText
              primary="Рейтинг контента"
              secondary={
                film ? (
                  contentRatingFormatter(film?.content_rating)
                ) : (
                  <Skeleton>
                    <span>18+</span>
                  </Skeleton>
                )
              }
            />
          </ListItem>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 150px)",
            gap: "1rem",
          }}
        >
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemText primary="Жанры" />
            </ListItem>
            {genres
              ? genres.map((genre) => (
                  <GenreListItem key={genre.id} genre={genre} />
                ))
              : Array.from({ length: 5 }, (_, index) => (
                  <Skeleton key={index}>
                    <GenreListItem
                      genre={api.genres.initial({
                        name: "Какой-нибудь жанр",
                      })}
                    />
                  </Skeleton>
                ))}
          </List>
          {Object.entries(personsByRole).map(([roleName, filmPersons]) => (
            <List key={roleName} disablePadding>
              <ListItem disablePadding>
                <ListItemText primary={roleName} />
              </ListItem>
              {filmPersons.map((fp) => (
                <ListItem key={fp.id} disablePadding>
                  <ListItemText secondary={formatFullName(fp.person)} />
                </ListItem>
              ))}
            </List>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

interface VideoWithVideoFiles extends Video {
  videoFiles: VideoFile[];
}

// TODO: нужно оптимизировать, изменить map и filter, а то сложность O^2
function useVideoWithVideoFiles(
  videos?: Video[],
  videoFiles?: VideoFile[]
): VideoWithVideoFiles[] {
  return React.useMemo(() => {
    if (!videos) {
      return [];
    }
    return videos
      .map((video) => {
        let videoFilesForVideo: VideoFile[] = [];
        if (videoFiles) {
          videoFilesForVideo = videoFiles.filter(
            (videoFile) => videoFile.video === video.id && !!videoFile.file
          );
        }
        return { ...video, videoFiles: videoFilesForVideo };
      }, [])
      .filter((video) => !!video.videoFiles.length);
  }, [videoFiles, videos]);
}

const PosterImage = styled("img")(({ theme }) => ({
  aspectRatio: "3/4",
  height: "fit-content",
  width: "30%",
  objectFit: "cover",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "50vh",
  },
}));

const SkeletonPosterImage = PosterImage.withComponent(Skeleton);

const DescriptionContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      flexWrap: "wrap",
    }}
  >
    {children}
  </Box>
);

const VideoPlayer: React.FC<{ film?: Film | null }> = ({ film }) => {
  const { videos } = useVideos(film ? { film: film.id } : null);
  const { videoFiles, isVideoFilesLoading } = useVideoFiles(
    videos?.length
      ? {
          video: videos?.map((v) => v.id).join(","),
        }
      : null
  );
  const videosWithVideoFiles = useVideoWithVideoFiles(videos, videoFiles);
  const videoFolders = React.useMemo(() => {
    if (!videoFiles?.length || !film) {
      return "";
    }
    if (film.type === "film") {
      return makeVideoFilesUrlsForPlayer(videoFiles);
    }
    const grouppedBySeasons = groupBy(videosWithVideoFiles, "season");
    return Object.entries(grouppedBySeasons).map(([season, videos]) => {
      return {
        title: `Сезон ${season}`,
        folder: videos.map((video) => ({
          id: `${video.season} ${video.series}`,
          title: `Серия ${video.series}`,
          file: makeVideoFilesUrlsForPlayer(video.videoFiles),
        })),
      };
    });
  }, [film, videoFiles, videosWithVideoFiles]);
  if (isVideoFilesLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ minHeight: "50vh" }}
      />
    );
  }
  if (!videoFolders.length) {
    return <NotFoundVideoFiles />;
  }
  return <PlayerJS id="player" file={videoFolders} />;
};

export default function FilmPage() {
  const router = useRouter();
  const filmSlug = router.query.filmSlug as string;
  const { films, filmsErrors, isFilmsLoading } = useFilms({ slug: filmSlug });
  const film = React.useMemo(
    () => (films?.results.length ? films?.results[0] : null),
    [films?.results]
  );
  const genres = useDictionariesContext().genres;
  const { persons } = usePersons({ id: film?.persons.join(",") });
  const filmGenres = React.useMemo(
    () =>
      Object.values(genres).filter((genre) => film?.genres.includes(genre.id)),
    [film?.genres, genres]
  );
  const { personRoles } = usePersonRoles();
  const { filmsPersons } = useFilmsPersons(
    film ? { film: film.id } : undefined
  );
  if (!films?.results.length && !filmsErrors && !isFilmsLoading) {
    return <NotFound text="Фильм не найден" />;
  }
  return (
    <Container maxWidth="lg">
      <Head>
        <title>{film?.name} смотреть онлайн</title>
      </Head>
      <Script src="/playerjs.js" type="text/javascript" async />
      <DescriptionContainer>
        {film?.image ? (
          <PosterImage
            src={film.image}
            alt={`Постер к фильму ${film.name}`}
            width="1200"
            height="1600"
          />
        ) : (
          <SkeletonPosterImage variant="rectangular" />
        )}
        <DetailsContent
          film={film}
          genres={filmGenres}
          persons={persons}
          personRoles={personRoles}
          filmsPersons={filmsPersons}
        />
      </DescriptionContainer>
      <Box sx={{ mt: 5 }}>
        <VideoPlayer film={film} />
      </Box>
    </Container>
  );
}

FilmPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
