import { path } from "static-path";

export const root = path("/");
export const categories = path("/category");
export const category = categories.path("/:category");
export const categoryGenres = category.path("/genre");
export const categoryGenre = categoryGenres.path("/:genre");
export const categoryCountries = category.path("/country");
export const categoryCountry = categoryCountries.path("/:country");
export const categoryYears = category.path("/year");
export const categoryYear = categoryYears.path("/:year");

export const film = path("/:film");

export const baseSearch = path("/search");
export const search = baseSearch.path("/:searchText");

export const copyright = path("/copyright");
export const feedback = path("/feedback");

export const login = path("/login");
export const signup = login.path("/signup");
export const signupSuccess = signup.path("/success");
export const sendRestoreLink = login.path("/restore");
export const sendRestoreLinkSuccess = sendRestoreLink.path("/success");
