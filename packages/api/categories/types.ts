import { Dictionary } from "../../api/base";
import { Film } from "../films/types";

export interface Category extends Dictionary {}

export interface FilmCategory {
  film: Film["id"];
  category: Category["id"];
}
