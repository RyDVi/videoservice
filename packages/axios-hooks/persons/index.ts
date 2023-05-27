import useSwr from "swr";
import { useAxiosRequest } from "../axios";
import { Person, persons, ValidationErrors } from "@modules/api";

export function usePersons(filters?: Parameters<typeof persons.list>[0]) {
  filters;
  const { data, error, mutate } = useSwr<Person[]>([
    persons.list(filters).url,
    persons.list(filters),
  ]);
  const isPersonsLoading = !data && !error;
  return {
    persons: data,
    personsErrors: error,
    mutatePersons: mutate,
    isPersonsLoading,
  };
}

export function useSavePerson(initialPerson?: Person) {
  const {
    data: person,
    request: savePerson,
    setData: setPerson,
    error: personError,
    loading: isLoadingSavePerson,
  } = useAxiosRequest<Person, Person, ValidationErrors<Person>>({
    initial: initialPerson || persons.initial(),
    config: (person) => persons.save(person),
  });

  return { person, savePerson, setPerson, personError, isLoadingSavePerson };
}

export function usePerson(id?: string | string[] | null) {
  const {
    data: person,
    error: personError,
    mutate: mutatePerson,
  } = useSwr<Person>(id ? persons.retrieve(id).url : null);
  const isPersonLoading = !person && !personError;
  return { person, personError, mutatePerson, isPersonLoading };
}

export function useDeletePerson(id?: string | string[]) {
  const { loading, request, error } = useAxiosRequest({
    initial: id,
    config: persons.destroy,
  });
  return {
    deletePerson: request,
    isDeletingPerson: loading,
    errorOfDeletePerson: error,
  };
}
