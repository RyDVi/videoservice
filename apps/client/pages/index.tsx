import { useFilms } from "@modules/api";
import {
  FilmCategoryBlock,
  FilmsGridLoader,
  FilmsGrid,
  NotFoundFilms,
} from "@modules/client";
import * as R from "ramda";
import paths from "../src/paths";
import { AppPage } from "../src/AppPage";
import { useRouter } from "next/router";
import { useFilmMove } from "../src/hooks";
import { Box } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { buildHrefToFilm } = useFilmMove();
  const { films, isFilmsLoading } = useFilms({
    search: router.query.searchText as string,
  });
  if (isFilmsLoading) {
    return <FilmsGridLoader />;
  }
  if (!films) {
    return <NotFoundFilms />;
  }
  const filmsByCategories = R.groupBy(
    R.prop<string>("content_rating"),
    films?.results || []
  );
  return (
    <Box sx={{ padding: 3 }}>
      {Object.entries(filmsByCategories).map(([category, categoryFilms]) => (
        <FilmCategoryBlock
          key={category}
          categoryName={category}
          categoryHref={paths.category({ category })}
          sx={{ padding: 1 }}
        >
          <FilmsGrid films={categoryFilms} toFilm={buildHrefToFilm} />
        </FilmCategoryBlock>
      ))}
    </Box>
  );
}

Home.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
