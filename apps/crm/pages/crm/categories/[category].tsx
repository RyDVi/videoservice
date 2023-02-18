import { useCategory } from "@modules/api";
import { CrmSidebar, PageProvider, CRMContainer } from "crmui";
import { useRouter } from "next/router";
import { CreateEditCategoryForm } from "crmui";
import React from "react";
import { CircularProgress } from "@mui/material";

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const categoryId = router.query.category as string;
  const isCreating = categoryId === "create";
  const { category, isCategoryLoading } = useCategory(
    isCreating ? null : categoryId
  );
  return (
    <PageProvider
      title={isCreating ? "Создание категории" : `Категория ${category?.name}`}
    >
      <CRMContainer sidebarContent={<CrmSidebar />}>
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
      </CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
