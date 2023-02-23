import {
  Film,
  Genre,
  Person,
  PersonRole,
  useFilms,
  useGenres,
  usePersonRoles,
  usePersons,
  useVideos,
  Video,
  VideoFile,
  api,
  useVideoFiles,
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
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { COUNTRIES_MAP } from "@modules/constants";
import React from "react";
import { AppPage } from "../../src/AppPage";
import { makeVideoFilesUrlsForPlayer, PlayerJS } from "@modules/videoplayer";
import * as R from "ramda";
import { NotFound, NotFoundVideoFiles } from "@modules/client/notfound";
import { styled } from "@mui/material/styles";
import Script from "next/script";

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
}

const DetailsContent: React.FC<DetailsContentProps> = ({
  film,
  genres,
  persons,
  personRoles,
  ...props
}) => {
  const personsByRole = React.useMemo(
    () => (persons ? groupBy(persons, "role") : {}),
    [persons]
  );
  const personRolesDict = React.useMemo(
    () => (personRoles ? dictFromArray(personRoles, "id") : {}),
    [personRoles]
  );
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
        <Box sx={{ marginLeft: "auto" }}>
          <FilmRating rating={9.1} />
        </Box>
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
                nesciunt. Repudiandae aliquam commodi at aperiam sed, nobis nam
                labore ipsa incidunt natus, tenetur consequuntur rerum
                dignissimos qui perspiciatis pariatur facilis rem excepturi ut,
                iure amet aspernatur! At atque voluptates eveniet.
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
        }}
      >
        <Box sx={{ maxWidth: 300 }}>
          <ListItem>
            <ListItemText
              primary="Год (NI)"
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
          <ListItem>
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
          <ListItem>
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
        <List sx={{ pl: 2 }}>
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
        {Object.entries(personsByRole).map(([role, persons]) => (
          <List key={role} sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText primary={personRolesDict[role]?.name} />
            </ListItem>
            {persons.map((persons) => (
              <ListItem key={persons.id} disablePadding>
                <ListItemText secondary={persons.lastname} />
              </ListItem>
            ))}
          </List>
        ))}
      </Box>
    </Box>
  );
};

interface VideoWithVideoFiles extends Video {
  videoFiles: VideoFile[];
}

function useVideoWithVideoFiles(
  videos?: Video[],
  videoFiles?: VideoFile[]
): VideoWithVideoFiles[] {
  return React.useMemo(() => {
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

const PosterImage = styled(Image)(({ theme }) => ({
  aspectRatio: "3/4",
  height: "fit-content",
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "auto",
    maxWidth: "100%",
    maxHeight: "50vh",
  },
}));

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

export default function FilmPage() {
  const router = useRouter();
  const filmSlug = router.query.filmSlug as string;
  const { films, filmsErrors, isFilmsLoading } = useFilms({ slug: filmSlug });
  const film = React.useMemo(
    () => (films?.results.length ? films?.results[0] : null),
    [films?.results]
  );
  const { videos } = useVideos({ filmId: film?.id });
  const { videoFiles } = useVideoFiles({
    video: videos?.map((v) => v.id).join(","),
  });
  const videosWithVideoFiles = useVideoWithVideoFiles(videos, videoFiles);
  const videoFolders = React.useMemo(() => {
    if (!videoFiles?.length) {
      return "";
    }
    const grouppedBySeasons = groupBy(videosWithVideoFiles, "season");
    return Object.entries(grouppedBySeasons).map(([season, videos]) => ({
      title: `Сезон ${season}`,
      folder: videos.map((video) => ({
        title: `Серия ${video.series}`,
        file: makeVideoFilesUrlsForPlayer(video.videoFiles),
      })),
    }));
  }, [videoFiles?.length, videosWithVideoFiles]);
  const { genres } = useGenres();
  const { persons } = usePersons({ id: film?.persons.join(",") });
  const filmGenres = React.useMemo(
    () => genres?.filter((genre) => film?.genres.includes(genre.name)),
    [film?.genres, genres]
  );
  const { personRoles } = usePersonRoles();
  if(!films?.results.length && !filmsErrors && !isFilmsLoading){
    return <NotFound text="Фильм не найден" />
  }
  return (
    <Container maxWidth="lg">
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
          <Skeleton variant="rectangular" />
        )}
        <DetailsContent
          film={film}
          genres={filmGenres}
          persons={persons}
          personRoles={personRoles}
        />
      </DescriptionContainer>
      <Box sx={{ mt: 5 }}>
        {!!videoFolders.length ? (
          <PlayerJS id="player" file={videoFolders} />
        ) : (
          <NotFoundVideoFiles />
        )}
      </Box>
    </Container>
  );
}

FilmPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
