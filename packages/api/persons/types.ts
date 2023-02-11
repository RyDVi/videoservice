import { PersonRole } from "../person_roles/types";

export interface Person {
  readonly id: string;
  role: PersonRole["id"];
  firstname: string;
  lastname: string;
}
