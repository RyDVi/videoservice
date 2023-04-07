import { CrmSidebar, CRMContainer, useCrmPageTitle } from "crmui";

function CustomersPage() {
  useCrmPageTitle("Клиенты");
  return <>Клиенты</>;
}

CustomersPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default CustomersPage;
