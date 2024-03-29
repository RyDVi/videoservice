import { Film } from "@modules/api";
import { useRouter } from "next/router";
import React from "react";
import * as paths from "./paths";

export function useSearch() {
  const router = useRouter();

  const search = React.useCallback(
    (searchText: string) => router.push(paths.search({ searchText })),
    [router]
  );
  return { search };
}

export function useFilmMove() {
  const router = useRouter();

  const moveToFilm = React.useCallback(
    (film: string) => router.push(paths.film({ film })),
    [router]
  );

  const buildHrefToFilm = React.useCallback(
    (film: Film) => paths.film({ film: film.slug }),
    []
  );

  return { moveToFilm, buildHrefToFilm };
}
