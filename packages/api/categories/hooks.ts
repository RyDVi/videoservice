import { useRequest } from "../base/request";
import { ValidationErrors } from "../base/request";
import useSwr from "swr";
import { Category, CategoryWithDicts } from "./types";
import { categories } from "./endpoints";

export function useSaveCategory(initialCategory?: Category | null) {
  const {
    data: category,
    request: saveCategory,
    setData: setCategory,
    error: categoryError,
    loading,
  } = useRequest<Category, Category, ValidationErrors<Category>>({
    initial: initialCategory || categories.initial(),
    config: (category) => categories.save(category),
  });

  return { category, saveCategory, setCategory, categoryError, loading };
}

export function useCategory(id?: string | string[] | null) {
  const {
    data: category,
    error: categoryError,
    mutate: mutateCategory,
  } = useSwr<Category>(id ? categories.retrieve(id).url : null);
  const isCategoryLoading = !category && !categoryError;
  return { category, categoryError, mutateCategory, isCategoryLoading };
}

export function useCategories(
  filters?: Parameters<typeof categories.list>[0] | null
) {
  const { data, error, mutate } = useSwr<Category[]>(
    filters ? [categories.list(filters).url, categories.list(filters)] : null
  );
  const isCategoriesLoading = !data && !error;
  return {
    categories: data,
    categoriesErrors: error,
    mutateCategories: mutate,
    isCategoriesLoading,
  };
}

export function useDeleteCategory(id?: string | string[]) {
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: categories.destroy,
  });
  return {
    deleteCategory: request,
    isDeletingCategory: loading,
    errorOfDeleteCategory: error,
  };
}

export function useCategoriesWithDicts(
  filters?: Parameters<typeof categories.with_dicts>[0] | null
) {
  const { data, error, mutate } = useSwr<CategoryWithDicts[]>(
    filters
      ? [categories.with_dicts(filters).url, categories.with_dicts(filters)]
      : null
  );
  const isCategoriesLoading = !data && !error;
  return {
    categories: data,
    categoriesErrors: error,
    mutateCategories: mutate,
    isCategoriesLoading,
  };
}
