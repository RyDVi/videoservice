import { useCategory } from "@modules/axios-hooks";
import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { CreateEditCategoryForm } from "src/forms";

function CategoriesPage() {
  const router = useRouter();
  const categoryId = router.query.category as string;
  const isCreating = categoryId === "create";
  const { category, isCategoryLoading } = useCategory(
    isCreating ? null : categoryId
  );
  useCrmPageTitle(
    isCreating ? "Создание категории" : `Категория ${category?.name}`
  );
  return (
    <>
      {isCategoryLoading && !isCreating ? (
        <CircularProgress />
      ) : (
        <CreateEditCategoryForm
          data={category}
          onSave={() => {
            router.back();
          }}
          onCancel={() => {
            router.back();
          }}
        />
      )}
    </>
  );
}

CategoriesPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default CategoriesPage;
