import { Film, useFilms } from "@modules/api";
import {
  FilmCategoryBlock,
  FilmsGridLoader,
  FilmsGrid,
  NotFoundFilms,
} from "@modules/client";
import * as paths from "../src/paths";
import { AppPage } from "../src/AppPage";
import { useFilmMove } from "../src/hooks";
import { Box } from "@mui/material";

const FilmGridHome: React.FC<{ films?: Film[]; loading?: boolean }> = ({
  films,
  loading,
}) => {
  const { buildHrefToFilm } = useFilmMove();
  if (loading) {
    return <FilmsGridLoader />;
  }
  if (!films?.length) {
    return <NotFoundFilms />;
  }
  return <FilmsGrid films={films} toFilm={buildHrefToFilm} />;
};
export default function Home() {
  const { films: serials, isFilmsLoading: isSerialsLoading } = useFilms({
    category: "сериалы", page_size: 10
  });
  const { films, isFilmsLoading } = useFilms({ category: "фильмы", page_size: 10 });
  const { films: multfilms, isFilmsLoading: isMultfilmsLoading } = useFilms({
    category: "мультфильмы", page_size: 10
  });

  return (
    <Box sx={{ padding: 3 }}>
      <FilmCategoryBlock
        categoryName="Фильмы"
        categoryHref={paths.category({ category: "фильмы" })}
        sx={{ padding: 1 }}
      >
        <FilmGridHome
          films={films?.results || []}
          loading={isFilmsLoading}
        />
      </FilmCategoryBlock>
      <FilmCategoryBlock
        categoryName="Сериалы"
        categoryHref={paths.category({ category: "Сериалы" })}
        sx={{ padding: 1 }}
      >
        <FilmGridHome
          films={serials?.results || []}
          loading={isSerialsLoading}
        />
      </FilmCategoryBlock>
      <FilmCategoryBlock
        categoryName="Мультфильмы"
        categoryHref={paths.category({ category: "Мультфильмы" })}
        sx={{ padding: 1 }}
      >
        <FilmGridHome
          films={multfilms?.results || []}
          loading={isMultfilmsLoading}
        />
      </FilmCategoryBlock>
    </Box>
  );
}

Home.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
