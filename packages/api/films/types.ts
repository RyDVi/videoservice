import { Dictionary } from "../../api/base";
import { CodesOfCountry } from "@modules/constants";
import { DealType } from "../deals/types";
import { User } from "../users/types";
import { Genre } from "../genres/types";
import { Person } from "../persons/types";

export const CONTENT_RATINGS = {
  0: "0+",
  6: "6+",
  12: "12+",
  18: "18+",
};

export type ContentRatingType = keyof typeof CONTENT_RATINGS;

export const VIDEO_TYPES = {
  film: "Фильм",
  serial: "Серия",
};

export interface Film extends Dictionary {
  name: string;
  original_name: string;
  image?: string;
  description_full: string;
  description_short: string;
  country: CodesOfCountry;
  content_rating: ContentRatingType;
  genres: Genre["id"][];
  users: User["id"][];
  persons: Person["id"][];
  slug: string;
  year: number;
  categories: string[];
  type: keyof typeof VIDEO_TYPES;
}

export interface FilmPrice {
  film: Film["id"];
  type: DealType["id"];
}
