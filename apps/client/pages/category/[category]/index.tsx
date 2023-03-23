import { useFilms } from "@modules/api";
import { FilmsGrid, FilmsGridLoader, NotFoundFilms } from "@modules/client";
import { usePage } from "@modules/nextjs";
import { Box, Container, Pagination } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { AppPage } from "../../../src/AppPage";
import { COUNT_FILMS_PER_PAGE } from "../../../src/constants";
import { useFilmMove } from "../../../src/hooks";

const CategoryHeadTitle: React.FC = () => {
  const router = useRouter();
  const category = router.query.category as string;
  return (
    <Head>
      <title>{category} смотреть онлайн</title>
    </Head>
  );
};

export default function CategoryPage() {
  const [page, updatePage, page_size] = usePage({
    pageSize: COUNT_FILMS_PER_PAGE,
  });
  const router = useRouter();
  const category = router.query.category as string;
  const { films, isFilmsLoading } = useFilms({
    category: category,
    page_size,
    page,
  });
  const { buildHrefToFilm } = useFilmMove();
  if (isFilmsLoading) {
    return (
      <>
        <CategoryHeadTitle />
        <FilmsGridLoader />
      </>
    );
  }
  if (!films?.results.length) {
    return (
      <>
        <CategoryHeadTitle />
        <NotFoundFilms />
      </>
    );
  }
  return (
    <Container maxWidth="lg">
      <CategoryHeadTitle />
      <FilmsGrid films={films?.results || []} toFilm={buildHrefToFilm} />
      <Box sx={{ justifyContent: "center", display: "flex", p: 1 }}>
        <Pagination
          count={Math.ceil(films.count / page_size)}
          page={page}
          onChange={(_, page) => updatePage(page)}
          size="large"
        />
      </Box>
    </Container>
  );
}

CategoryPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
