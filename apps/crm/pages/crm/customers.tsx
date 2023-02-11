import { PageProvider, CrmSidebar, CRMContainer } from "crmui";

const CustomersPage: React.FC = () => {
  return (
    <PageProvider title="Клиенты">
      <CRMContainer sidebarContent={<CrmSidebar />}>Customers</CRMContainer>
    </PageProvider>
  );
};

export default CustomersPage;
