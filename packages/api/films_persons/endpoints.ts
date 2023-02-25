import { SaveEndpoint } from "../base";
import { FilmPerson } from "./types";

class FilmsPersonsEndpoint extends SaveEndpoint<FilmPerson> {
  initial(props?: Partial<FilmPerson>): FilmPerson {
    return {
      id: "",
      film: "",
      person: "",
      role: "",
      ...props,
    };
  }
}
export const filmsPersons = new FilmsPersonsEndpoint("/films_persons/");
