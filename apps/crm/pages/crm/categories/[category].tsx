import { CrmSidebar, PageProvider, CRMContainer } from "crmui";

const CategoriesPage: React.FC = () => {
  return (
    <PageProvider title="Клиенты">
      <CRMContainer sidebarContent={<CrmSidebar />}>Категории</CRMContainer>
    </PageProvider>
  );
};

export default CategoriesPage;
