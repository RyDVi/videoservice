import { useRequest } from "../base/request";
import { ValidationErrors } from "../base/request";
import useSwr from "swr";
import { Paginated } from "../base/types";
import { Category } from "./types";
import { categories } from './endpoints';

export function useSaveCategory(initialCategory?: Category) {
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

export function useCategory(id?: string | string[]) {
  const {
    data: category,
    error: categoryError,
    mutate: mutateCategory,
  } = useSwr<Category>(categories.retrieve(id).url);
  const isCategoryLoading = !category && !categoryError;
  return { category, categoryError, mutateCategory, isCategoryLoading };
}

export function useCategories(
  filters?: Parameters<typeof categories.list>[0] | null
) {
  const { data, error, mutate } = useSwr<Paginated<Category>>(
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
