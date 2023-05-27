import useSwr from "swr";
import { useAxiosRequest } from "../axios";
import { filmsPersons, FilmPerson, ValidationErrors } from "@modules/api";

export function useFilmsPersons(
  filters?: Parameters<typeof filmsPersons.list>[0]
) {
  filters;
  const { data, error, mutate } = useSwr<FilmPerson[]>([
    filmsPersons.list(filters).url,
    filmsPersons.list(filters),
  ]);
  const isFilmsPersonsLoading = !data && !error;
  return {
    filmsPersons: data,
    filmsPersonsErrors: error,
    mutateFilmsPersons: mutate,
    isFilmsPersonsLoading,
  };
}

export function useSaveFilmPerson(initialFilmPerson?: FilmPerson) {
  const {
    data: filmPerson,
    request: saveFilmPerson,
    setData: setFilmPerson,
    error: filmPersonError,
    loading: isLoadingSaveFilmPerson,
  } = useAxiosRequest<FilmPerson, FilmPerson, ValidationErrors<FilmPerson>>({
    initial: initialFilmPerson || filmsPersons.initial(),
    config: (filmPerson) => filmsPersons.save(filmPerson),
  });

  return {
    filmPerson,
    saveFilmPerson,
    setFilmPerson,
    filmPersonError,
    isLoadingSaveFilmPerson,
  };
}

export function useFilmPerson(id?: string | string[] | null) {
  const {
    data: filmPerson,
    error: filmPersonError,
    mutate: mutateFilmPerson,
  } = useSwr<FilmPerson>(id ? filmsPersons.retrieve(id).url : null);
  const isPersonLoading = !filmPerson && !filmPersonError;
  return { filmPerson, filmPersonError, mutateFilmPerson, isPersonLoading };
}

export function useDeleteFilmPerson(id?: string | string[]) {
  const { loading, request, error } = useAxiosRequest({
    initial: id,
    config: filmsPersons.destroy,
  });
  return {
    deleteFilmPerson: request,
    isDeletingFilmPerson: loading,
    errorOfDeleteFilmPerson: error,
  };
}
