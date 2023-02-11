import useSwr from "swr";
import { personsRoles } from "./endpoints";
import { PersonRole } from "./types";

export function usePersonRoles(
  filters?: Parameters<typeof personsRoles.list>[0]
) {
  filters;
  const { data, error, mutate } = useSwr<PersonRole[]>([
    personsRoles.list(filters).url,
    personsRoles.list(filters),
  ]);
  const isPersonRolesLoading = !data && !error;
  return {
    personRoles: data,
    personRolesErrors: error,
    mutatePersonRoles: mutate,
    isPersonRolesLoading,
  };
}
