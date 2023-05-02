import { useAxiosRequest } from "../axios/hooks";
import { ValidationErrors } from "../axios/types";
import useSwr from "swr";
import { films, Paginated, Film } from "@modules/api";
import React from "react";
import { isValidURL } from "@modules/utils";

export function useSaveFilm(initialFilm?: Film) {
  const {
    data: film,
    request: saveFilm,
    setData: setFilm,
    error: filmError,
    loading,
  } = useAxiosRequest<Film, Film, ValidationErrors<Film>>({
    initial: initialFilm || films.initial(),
    config: (film) => films.save(film),
  });

  const overriedSaveFilm = React.useCallback(
    (inputFilm?: Film) => {
      const image =
        (inputFilm?.image && isValidURL(inputFilm.image)) ||
        (film.image && isValidURL(film.image))
          ? undefined
          : inputFilm?.image || film.image;
      const lFilm: Film = { ...(inputFilm || film), image };
      return saveFilm(lFilm);
    },
    [film, saveFilm]
  );

  return { film, saveFilm: overriedSaveFilm, setFilm, filmError, loading };
}

export function useFilm(id?: string | string[]) {
  const {
    data: film,
    error: filmError,
    mutate: mutateFilm,
  } = useSwr<Film>(films.retrieve(id).url);
  const isFilmLoading = !film && !filmError;
  return { film, filmError, mutateFilm, isFilmLoading };
}

export function useFilms(filters?: Parameters<typeof films.list>[0] | null) {
  const { data, error, mutate } = useSwr<Paginated<Film>>(
    filters ? [films.list(filters).url, films.list(filters)] : null
  );
  const isFilmsLoading = !data && !error;
  return {
    films: data,
    filmsErrors: error,
    mutateFilms: mutate,
    isFilmsLoading,
  };
}

export function useDeleteFilm(id?: string | string[]) {
  const { loading, request, setData, error, response } = useAxiosRequest({
    initial: id,
    config: films.destroy,
  });
  return {
    deleteFilm: request,
    isDeletingFilm: loading,
    errorOfDeleteFilm: error,
  };
}
