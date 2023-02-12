import { useCategory } from "@modules/api";
import { CrmSidebar, PageProvider, CRMContainer, paths } from "crmui";
import { useRouter } from "next/router";
import { CreateEditCategoryForm } from "crmui";
import { api } from "@modules/api";
import { useSaveCategory } from "../../../../../packages/api/categories/hooks";

const CategoriesPage: React.FC = () => {
  const router = useRouter();
  const categoryId = router.query.category as string;
  const isCreating = categoryId === "create";
  const { category: loadCategory } = useCategory(
    isCreating ? null : categoryId
  );
  const { category: initialCategory, saveCategory } =
    useSaveCategory(loadCategory);
  const category = loadCategory || initialCategory;
  return (
    <PageProvider
      title={isCreating ? "Создание категории" : `Категория ${category.name}`}
    >
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <CreateEditCategoryForm
          data={category}
          onSave={() => {
            router.back();
          }}
          onCancel={() => {
            router.back();
          }}
        />
      </CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
