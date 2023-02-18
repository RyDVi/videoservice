import { SaveEndpoint } from "../base/endpoints";
import { Genre } from "./types";

class GenresEndpoint extends SaveEndpoint<Genre, {category?: string;}> {
  initial(props?: Partial<Genre>): Genre {
    return {
      id: "",
      name: "",
      ...props,
    };
  }
}

export const genres = new GenresEndpoint("/genres/");
