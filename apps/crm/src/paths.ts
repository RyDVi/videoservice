import { path } from "static-path";

export const root = path("/");
export const crmRoot = root.path("/crm");

export const home = crmRoot.path("/home");

export const films = crmRoot.path("/films");
export const film = films.path("/:filmId");
export const filmCreate = films.path("/create");

export const videoRoot = film.path("/video");
export const videoCreate = videoRoot.path("/create");
export const video = videoRoot.path("/:videoId");

export const customers = crmRoot.path("/customers");
export const customer = customers.path("/:customerId");

export const settings = crmRoot.path("/settings");

export const logout = crmRoot.path("/logout");
export const login = root.path("/login");

export const categories = crmRoot.path("/categories");
export const category = categories.path("/:categoryId");

export const genres = crmRoot.path("/genres");
export const genre = genres.path("/:genreId");

export const persons = crmRoot.path("/persons");
export const person = persons.path("/:personId");

export const roles = crmRoot.path("/roles");
export const role = roles.path("/:roleId");
