import { SaveEndpoint } from "../base/endpoints";
import { useRequest, ValidationErrors } from "../base/request";
import useSwr from "swr";
import { Genre } from "./types";

export function useSaveGenre(initialGenre?: Genre) {
  const {
    data: genre,
    request: saveGenre,
    setData: setGenre,
    error: genreError,
    loading,
  } = useRequest<Genre, Genre, ValidationErrors<Genre>>({
    initial: initialGenre || genresEndpoints.initial(),
    config: (genre) => genresEndpoints.save(genre),
  });

  return { genre, saveGenre, setGenre, genreError, loading };
}

export function useGenres(
  filters?: Parameters<typeof genresEndpoints.list>[0]
) {
  const { data, error, mutate } = useSwr<Genre[]>([
    genresEndpoints.list(filters).url,
    genresEndpoints.list(filters),
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
    config: genresEndpoints.destroy,
  });
  return {
    deleteGenre: request,
    isDeletingGenre: loading,
    errorOfDeleteGenre: error,
  };
}
class GenresEndpoint extends SaveEndpoint<Genre> {
  initial(props?: Partial<Genre>): Genre {
    return {
      id: "",
      name: "",
      ...props,
    };
  }
}

const genresEndpoints = new GenresEndpoint("/genres/");

export default genresEndpoints;
