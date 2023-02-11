import { useRequest, ValidationErrors } from "../base/request";
import useSwr from "swr";
import { Genre } from "./types";
import { genres } from "./endpoints";

export function useSaveGenre(initialGenre?: Genre) {
  const {
    data: genre,
    request: saveGenre,
    setData: setGenre,
    error: genreError,
    loading,
  } = useRequest<Genre, Genre, ValidationErrors<Genre>>({
    initial: initialGenre || genres.initial(),
    config: (genre) => genres.save(genre),
  });

  return { genre, saveGenre, setGenre, genreError, loading };
}

export function useGenres(filters?: Parameters<typeof genres.list>[0]) {
  const { data, error, mutate } = useSwr<Genre[]>([
    genres.list(filters).url,
    genres.list(filters),
  ]);
  const isGenresLoading = !data && !error;
  return {
    genres: data,
    genresErrors: error,
    mutateGenres: mutate,
    isGenresLoading,
  };
}

export function useDeleteGenre(id?: string | string[]) {
  const { loading, request, error, response } = useRequest({
    initial: id,
    config: genres.destroy,
  });
  return {
    deleteGenre: request,
    isDeletingGenre: loading,
    errorOfDeleteGenre: error,
  };
}
