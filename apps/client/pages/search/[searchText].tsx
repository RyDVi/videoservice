import { useFilms } from "@modules/api";
import { FilmsGrid, FilmsGridLoader } from "@modules/client";
import { useRouter } from "next/router";
import { AppPage } from "../../src/AppPage";
import { useFilmMove } from "../../src/hooks";
import { NotFoundFilms } from "@modules/client/notfound/NotFoundFilms";

export default function SearchPage() {
  const router = useRouter();
  const { buildHrefToFilm } = useFilmMove();
  const { films, isFilmsLoading } = useFilms({
    search: router.query.searchText as string,
  });
  if (isFilmsLoading) {
    return <FilmsGridLoader />;
  }
  if (!films?.results.length) {
    return <NotFoundFilms />;
  }
  return (
    <>
      <FilmsGrid films={films.results} toFilm={buildHrefToFilm} />
    </>
  );
}

SearchPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
