import { SaveEndpoint } from "../base";
import { Person } from "./types";

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
export const persons = new PersonsEndpoint("/persons/");
