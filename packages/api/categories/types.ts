import { Dictionary } from "../../api/base";
import { Film } from "../films/types";

export const CATEGORY_TYPES = {
  Genre: "Genre",
  Country: "Country",
};

export type CategoryTypes = keyof typeof CATEGORY_TYPES;

export interface Category extends Dictionary {
  type: CategoryTypes;
}

export interface FilmCategory {
  film: Film["id"];
  category: Category["id"];
}
