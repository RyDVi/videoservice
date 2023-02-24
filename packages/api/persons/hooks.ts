import useSwr from "swr";
import { useRequest, ValidationErrors } from "../base";
import { persons } from "./endpoints";
import { Person } from "./types";

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
  } = useRequest<Person, Person, ValidationErrors<Person>>({
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
  const { loading, request, error } = useRequest({
    initial: id,
    config: persons.destroy,
  });
  return {
    deletePerson: request,
    isDeletingPerson: loading,
    errorOfDeletePerson: error,
  };
}
