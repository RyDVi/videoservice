import { useCategories, useDeleteCategory } from "@modules/api";
import { CircularProgress } from "@mui/material";
import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  paths,
  DictionaryPanel,
  DictionariesList,
} from "crmui";
import React from "react";

const CategoriesPage: React.FC = () => {
  const { categories, isCategoriesLoading } = useCategories({});
  const { deleteCategory } = useDeleteCategory();
  return (
    <PageProvider title="Категории фильмов">
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel
          createLink={paths.category({ categoryId: "create" })}
        />
        {isCategoriesLoading ? (
          <CircularProgress />
        ) : (
          <DictionariesList
            data={categories || []}
            onDelete={({ id }) => deleteCategory(id)}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
