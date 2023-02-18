import { path } from "static-path";

export const root = path("/");
export const categories = path("/category");
export const category = categories.path("/:category");
export const categoryGenre = category.path("/genre/:genre");
export const categoryCountry = category.path("/country/:country");
export const categoryYear = category.path("/year/:year");

export const film = path("/:film");

export const search = path("/search/:searchText");
