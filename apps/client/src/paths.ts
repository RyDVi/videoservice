import { path } from "static-path";

const root = path("/");
const category = path("/category/:category");
const subcategory = category.path(":subcategory");

const film = path("/:film");

const search = path("/search/:searchText")

export default { subcategory, root, category, film, search };
