import useSwr from "swr";
import { useAxiosRequest } from "../axios";
import { PersonRole, personsRoles, ValidationErrors } from "@modules/api";

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

export function useSavePersonRole(initialPersonRole?: PersonRole) {
  const {
    data: personRole,
    request: savePersonRole,
    setData: setPersonRole,
    error: personRoleError,
    loading,
  } = useAxiosRequest<PersonRole, PersonRole, ValidationErrors<PersonRole>>({
    initial: initialPersonRole || personsRoles.initial(),
    config: (personRole) => personsRoles.save(personRole),
  });

  return {
    personRole,
    savePersonRole,
    setPersonRole,
    personRoleError,
    loading,
  };
}

export function usePersonRole(id?: string | string[] | null) {
  const {
    data: personRole,
    error: personRoleError,
    mutate: mutatePersonRole,
  } = useSwr<PersonRole>(id ? personsRoles.retrieve(id).url : null);
  const isPersonRoleLoading = !personRole && !personRoleError;
  return { personRole, personRoleError, mutatePersonRole, isPersonRoleLoading };
}

export function useDeletePersonRole(id?: string | string[]) {
  const { loading, request, error, response } = useAxiosRequest({
    initial: id,
    config: personsRoles.destroy,
  });
  return {
    deletePersonRole: request,
    isDeletingPersonRole: loading,
    errorOfDeletePersonRole: error,
  };
}
