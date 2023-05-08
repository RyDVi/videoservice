import { useCategories, useDeleteCategory } from "@modules/axios-hooks";
import { CircularProgress } from "@mui/material";
import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";
import React from "react";
import * as paths from "src/paths";
import { DictionariesList, DictionaryPanel } from "src/elements";

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
