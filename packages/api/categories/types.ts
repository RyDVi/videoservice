import { Dictionary } from "../../api/base";
import { Film } from "../films/types";

export interface Category extends Dictionary {
  slug: string;
}

export interface CategoryWithDicts extends Category {
  genres: string[];
  countries: string[];
  years: number[];
}

export interface FilmCategory {
  film: Film["id"];
  category: Category["id"];
}
