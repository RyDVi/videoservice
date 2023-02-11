import { CrmSidebar, PageProvider, CRMContainer } from "crmui";

const HomePage: React.FC = () => {
  return (
    <PageProvider title="Домашняя страница">
      <CRMContainer sidebarContent={<CrmSidebar />}></CRMContainer>
    </PageProvider>
  );
};

export default HomePage;
