import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";

function CustomersPage() {
  useCrmPageTitle("Клиенты");
  return <>Клиенты</>;
}

CustomersPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default CustomersPage;
