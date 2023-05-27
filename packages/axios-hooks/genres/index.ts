import { useAxiosRequest } from "../axios";
import useSwr from "swr";
import { Genre, genres, ValidationErrors } from "@modules/api";

export function useSaveGenre(initialGenre?: Genre) {
  const {
    data: genre,
    request: saveGenre,
    setData: setGenre,
    error: genreError,
    loading,
  } = useAxiosRequest<Genre, Genre, ValidationErrors<Genre>>({
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

export function useGenre(id?: string | string[] | null) {
  const {
    data: genre,
    error: genreError,
    mutate: mutateGenre,
  } = useSwr<Genre>(id ? genres.retrieve(id).url : null);
  const isGenreLoading = !genre && !genreError;
  return { genre, genreError, mutateGenre, isGenreLoading };
}

export function useDeleteGenre(id?: string | string[]) {
  const { loading, request, error, response } = useAxiosRequest({
    initial: id,
    config: genres.destroy,
  });
  return {
    deleteGenre: request,
    isDeletingGenre: loading,
    errorOfDeleteGenre: error,
  };
}
