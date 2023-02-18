import { useFilms } from "@modules/api";
import { FilmsGrid, FilmsGridLoader, NotFoundFilms } from "@modules/client";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { AppPage } from "../../../../src/AppPage";
import { useFilmMove } from "../../../../src/hooks";

export default function CategoryGenrePage() {
  const router = useRouter();
  const category = router.query.category as string;
  const year = router.query.year as string;
  const { films, isFilmsLoading } = useFilms({ category, year });
  const { buildHrefToFilm } = useFilmMove();
  if (isFilmsLoading) {
    return <FilmsGridLoader />;
  }
  if (!films?.results.length) {
    return <NotFoundFilms />;
  }
  return (
    <Container maxWidth="lg" sx={{ p: 1 }}>
      <FilmsGrid films={films?.results || []} toFilm={buildHrefToFilm} />
    </Container>
  );
}

CategoryGenrePage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
