import { useCategories, useDeleteCategory } from "@modules/api";
import { CircularProgress } from "@mui/material";
import {
  CrmSidebar,
  CRMContainer,
  paths,
  DictionaryPanel,
  DictionariesList,
  useCrmPageTitle,
} from "crmui";
import React from "react";

function CategoriesPage() {
  const { categories, isCategoriesLoading } = useCategories({});
  const { deleteCategory } = useDeleteCategory();
  useCrmPageTitle("Категории фильмов");
  return (
    <>
      <DictionaryPanel createLink={paths.category({ categoryId: "create" })} />
      {isCategoriesLoading ? (
        <CircularProgress />
      ) : (
        <DictionariesList
          data={categories || []}
          onDelete={({ id }) => deleteCategory(id)}
          itemLink={({ id }) => paths.category({ categoryId: id })}
        />
      )}
    </>
  );
}

CategoriesPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default CategoriesPage;
