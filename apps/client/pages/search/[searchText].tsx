import { useFilms } from "@modules/api";
import { FilmsGrid, FilmsGridLoader } from "@modules/client";
import { useRouter } from "next/router";
import { AppPage } from "../../src/AppPage";
import { useFilmMove } from "../../src/hooks";
import { NotFoundFilms } from "@modules/client/notfound/NotFoundFilms";
import { COUNT_FILMS_PER_PAGE } from "../../src/constants";
import { usePage } from "@modules/nextjs";
import { Box, Container, Pagination } from "@mui/material";

export default function SearchPage() {
  const [page, updatePage, page_size] = usePage({
    pageSize: COUNT_FILMS_PER_PAGE,
  });
  const router = useRouter();
  const { buildHrefToFilm } = useFilmMove();
  const { films, isFilmsLoading } = useFilms({
    search: router.query.searchText as string,
    page_size,
    page,
  });
  if (isFilmsLoading) {
    return <FilmsGridLoader />;
  }
  if (!films?.results.length) {
    return <NotFoundFilms />;
  }
  return (
    <Container maxWidth="lg" sx={{ p: 1 }}>
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
