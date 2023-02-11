import { SaveEndpoint } from "../base";
import { PersonRole } from "../types";

class PersonRolesEndpoint extends SaveEndpoint<PersonRole> {
  initial(props?: Partial<PersonRole>): PersonRole {
    return {
      id: "",
      name: "",
      ...props,
    };
  }
}
export const personsRoles = new PersonRolesEndpoint("/person_roles/");
