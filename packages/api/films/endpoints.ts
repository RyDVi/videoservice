import { PaginatedSaveEndpoint } from "../base/endpoints";
import { Film } from "./types";

class FilmsEndpoint extends PaginatedSaveEndpoint<
  Film,
  {
    search?: string;
    category?: string;
    slug?: string;
    genre?: string;
    year?: string;
    country?: string;
  }
> {
  initial(props?: Partial<Film>): Film {
    return {
      content_rating: 0,
      country: "RU",
      description_full: "",
      description_short: "",
      genres: [],
      id: "",
      image: "",
      name: "",
      persons: [],
      users: [],
      original_name: "",
      slug: "",
      year: new Date().getFullYear(),
      categories: [],
      ...props,
    };
  }
}

export const films = new FilmsEndpoint("/films/");
