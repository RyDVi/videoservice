import useSwr from "swr";
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
