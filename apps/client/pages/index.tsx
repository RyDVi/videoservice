import { Category, Film, useFilms } from "@modules/api";
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
import Head from "next/head";
import { useDictionariesContext } from "@modules/stores";

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

const FilmCateogory: React.FC<{ category: Category }> = ({ category }) => {
  const { films, isFilmsLoading } = useFilms({
    category: category.slug,
    page_size: 10,
  });
  return <FilmCategoryBlock
    categoryName={category.name}
    categoryHref={paths.category({ category: category.slug })}
  >
    <FilmGridHome films={films?.results || []} loading={isFilmsLoading} />
  </FilmCategoryBlock>
}

export default function Home() {
  const categoriesWithDicts = useDictionariesContext().categoriesWithDicts

  return (
    <Box sx={{ padding: 3, display: "grid", gap: "5rem" }}>
      <Head>
        <title>Фильмы и сериалы смотреть онлайн</title>
      </Head>
      {Object.values(categoriesWithDicts).map((category) => <FilmCateogory category={category} />)}
    </Box>
  );
}

Home.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
