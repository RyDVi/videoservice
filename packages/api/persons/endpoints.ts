import { SaveEndpoint } from "../base";
import { Person } from "./types";
import useSwr from "swr";

export function usePersons(
  filters?: Parameters<typeof personsEndpoint.list>[0]
) {
  filters;
  const { data, error, mutate } = useSwr<Person[]>([
    personsEndpoint.list(filters).url,
    personsEndpoint.list(filters),
  ]);
  const isPersonsLoading = !data && !error;
  return {
    persons: data,
    personsErrors: error,
    mutatePersons: mutate,
    isPersonsLoading,
  };
}

class PersonsEndpoint extends SaveEndpoint<Person> {
  initial(props?: Partial<Person>): Person {
    return {
      id: "",
      firstname: "",
      lastname: "",
      role: "",
      ...props,
    };
  }
}
const personsEndpoint = new PersonsEndpoint("/persons/");

export default { personsEndpoint };
