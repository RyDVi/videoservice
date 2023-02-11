import { Film } from "@modules/api";
import { Box, Skeleton } from "@mui/material";
import Link from "next/link";
import React from "react";
import CardList from "./CardList";
import FilmCard from "./FilmCard";

interface FilmsGrid {
  films: Film[];
  toFilm: (film: Film) => string;//TODO: possibly will be call rerender
}

export const FilmsGrid: React.FC<FilmsGrid> = ({ films, toFilm }) => (
  <CardList
    sx={{
      display: "grid",
      gap: "1rem",
      gridTemplateColumns: "repeat(auto-fill, 200px)",
      // justifyContent: "center",
    }}
  >
    {films.map((film) => (
      <Box key={film.id} sx={{ aspectRatio: "3/4", overflow: "hidden" }}>
        <Link href={toFilm(film)}>
          <FilmCard image={film.image} name={film.name} />
        </Link>
      </Box>
    ))}
  </CardList>
);

export const FilmsGridLoader: React.FC = () => {
  const films = Array.from(
    { length: 15 },
    (_, index) => ({ id: index, image: "", name: "" } as unknown as Film)
  );
  return (
    <CardList
      sx={{
        display: "grid",
        gap: "1rem",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        justifyContent: "center",
      }}
    >
      {films.map((film) => (
        <Skeleton
          key={film.id}
          variant="rectangular"
          placeholder="Загрузка фильмов"
        >
          <Box sx={{ aspectRatio: "3/4", overflow: "hidden" }}>
            <FilmCard image={film.image} name={film.name} />
          </Box>
        </Skeleton>
      ))}
    </CardList>
  );
};
