import { SaveEndpoint } from "../base";
import useSwr from "swr";
import { PersonRole } from "../person_roles";

export function usePersonRoles(
  filters?: Parameters<typeof personsRolesEndpoint.list>[0]
) {
  filters;
  const { data, error, mutate } = useSwr<PersonRole[]>([
    personsRolesEndpoint.list(filters).url,
    personsRolesEndpoint.list(filters),
  ]);
  const isPersonRolesLoading = !data && !error;
  return {
    personRoles: data,
    personRolesErrors: error,
    mutatePersonRoles: mutate,
    isPersonRolesLoading,
  };
}

class PersonRolesEndpoint extends SaveEndpoint<PersonRole> {
  initial(props?: Partial<PersonRole>): PersonRole {
    return {
      id: "",
      name: "",
      ...props,
    };
  }
}
const personsRolesEndpoint = new PersonRolesEndpoint("/person_roles/");

export default { personsRolesEndpoint };
