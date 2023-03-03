import { SaveEndpoint } from "../base/endpoints";
import { Category } from "./types";

interface CategoriesFilters {}
class CategoriesEndpoint extends SaveEndpoint<Category, CategoriesFilters> {
  initial(props?: Partial<Category>): Category {
    return {
      id: "",
      name: "",
      slug: "",
      ...props,
    };
  }
  with_dicts = (params?: CategoriesFilters) => ({
    url: `${this.uri}with_dicts/`,
    method: "GET",
    params,
  });
}

export const categories = new CategoriesEndpoint("/categories/");
