import { useFilms } from "@modules/axios-hooks";
import { FilmsGrid, FilmsGridLoader, NotFoundFilms } from "@modules/client";
import { usePage } from "@modules/nextjs";
import { Box, Container, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import { COUNT_FILMS_PER_PAGE } from "src/constants";
import { useFilmMove } from "src/hooks";
import { CategoryTitle } from "src/HeadTitles";

export default function SubCategoryPage() {
  const [page, updatePage, page_size] = usePage({
    pageSize: COUNT_FILMS_PER_PAGE,
  });
  const router = useRouter();
  const category = router.query.category as string;
  const name = router.query.name as string;
  const subcategoryName = router.query.subcategory as string;
  const { films, isFilmsLoading } = useFilms({
    category,
    [subcategoryName]: name,
    page_size,
    page,
  });
  const { buildHrefToFilm } = useFilmMove();
  if (isFilmsLoading) {
    return (
      <>
        <CategoryTitle />
        <FilmsGridLoader />
      </>
    );
  }
  if (!films?.results.length) {
    return (
      <>
        <CategoryTitle />
        <NotFoundFilms />
      </>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ p: 1 }}>
      <CategoryTitle />
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

SubCategoryPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
