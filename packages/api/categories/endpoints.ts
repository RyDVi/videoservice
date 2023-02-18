import { SaveEndpoint } from "../base/endpoints";
import { Category } from "./types";

class CategoriesEndpoint extends SaveEndpoint<Category> {
  initial(props?: Partial<Category>): Category {
    return {
      id: "",
      name: "",
      ...props,
    };
  }
}

export const categories = new CategoriesEndpoint("/categories/");
