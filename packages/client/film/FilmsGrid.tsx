import { Film } from "@modules/api";
import { Box, Skeleton, styled } from "@mui/material";
import Link from "next/link";
import React from "react";
import CardList from "./CardList";
import FilmCard from "./FilmCard";

const CardListContainer = styled(CardList)({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
});

const FilmCardContainer = styled(Box)({
  aspectRatio: "3/4",
  width: "100%",
  height: "100%",
  overflow: "hidden",
});

interface FilmsGrid {
  films: Film[];
  toFilm: (film: Film) => string; //TODO: possibly will be call rerender
}

export const FilmsGrid: React.FC<FilmsGrid> = ({ films, toFilm }) => (
  <CardListContainer>
    {films.map((film) => (
      <FilmCardContainer key={film.id}>
        <Link href={toFilm(film)}>
          <FilmCard
            image={film.image}
            name={film.name}
            shortDescription={film.description_short}
          />
        </Link>
      </FilmCardContainer>
    ))}
  </CardListContainer>
);

export const FilmsGridLoader: React.FC = () => {
  const films = Array.from(
    { length: 15 },
    (_, index) => ({ id: index, image: "", name: "" } as unknown as Film)
  );
  return (
    <CardListContainer>
      {films.map((film) => (
        <FilmCardContainer key={film.id}>
          <Skeleton
            variant="rectangular"
            placeholder="Загрузка фильмов"
            width="100%"
            height="100%"
          />
        </FilmCardContainer>
      ))}
    </CardListContainer>
  );
};
