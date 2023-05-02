import { useFilms } from "@modules/request-hooks";
import { FilmsGrid, FilmsGridLoader } from "@modules/client";
import { useRouter } from "next/router";
import { AppPage } from "src/AppPage";
import { useFilmMove } from "src/hooks";
import { NotFoundFilms } from "@modules/client/notfound/NotFoundFilms";
import { COUNT_FILMS_PER_PAGE } from "src/constants";
import { usePage } from "@modules/nextjs";
import { Box, Container, Pagination } from "@mui/material";
import Head from "next/head";

const SearchTextHeadTitle: React.FC = () => {
  const router = useRouter();
  const searchText = router.query.searchText as string;
  return (
    <Head>
      <title>Поиск {searchText}</title>
    </Head>
  );
};
export default function SearchPage() {
  const [page, updatePage, page_size] = usePage({
    pageSize: COUNT_FILMS_PER_PAGE,
  });
  const router = useRouter();
  const { buildHrefToFilm } = useFilmMove();
  const searchText = router.query.searchText as string;
  const { films, isFilmsLoading } = useFilms({
    search: searchText,
    page_size,
    page,
  });
  if (isFilmsLoading) {
    return (
      <>
        <SearchTextHeadTitle />
        <FilmsGridLoader />
      </>
    );
  }
  if (!films?.results.length) {
    return (
      <>
        <SearchTextHeadTitle />
        <NotFoundFilms />
      </>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ p: 1 }}>
      <SearchTextHeadTitle />
      <FilmsGrid films={films.results} toFilm={buildHrefToFilm} />
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

SearchPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
