import { Dictionary } from "../../api/base";
import { CodesOfCountry } from "@modules/constants";
import { DealType } from "../deals";
import { User } from "../users";
import { Genre } from "../genres";
import { Person } from "../persons";

export const CONTENT_RATINGS = {
  0: "0+",
  6: "6+",
  12: "12+",
  18: "18+",
};

export type ContentRatingType = keyof typeof CONTENT_RATINGS;

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
}

export interface FilmPrice {
  film: Film["id"];
  type: DealType["id"];
}
