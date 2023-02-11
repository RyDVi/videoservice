import { PaginatedSaveEndpoint } from "../base/endpoints";
import { useRequest } from "../base/request";
import { ValidationErrors } from "../base/request";
import useSwr from "swr";
import { Film } from "./types";
import { Paginated } from "../base/types";

export function useSaveFilm(initialFilm?: Film) {
  const {
    data: film,
    request: saveFilm,
    setData: setFilm,
    error: filmError,
    loading,
  } = useRequest<Film, Film, ValidationErrors<Film>>({
    initial: initialFilm || films.initial(),
    config: (film) => films.save(film),
  });

  return { film, saveFilm, setFilm, filmError, loading };
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
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: films.destroy,
  });
  return {
    deleteFilm: request,
    isDeletingFilm: loading,
    errorOfDeleteFilm: error,
  };
}
class FilmsEndpoint extends PaginatedSaveEndpoint<
  Film,
  { search?: string; category?: string; slug?: string }
> {
  initial(props?: Partial<Film>): Film {
    return {
      content_rating: 0,
      country: "RU",
      description_full: "",
      description_short: "",
      genres: [],
      id: "",
      image: "",
      name: "",
      persons: [],
      users: [],
      original_name: "",
      slug: "",
      year: new Date().getFullYear(),
      ...props,
    };
  }
}

const films = new FilmsEndpoint("/films/");

const api = { films };

export default api;
