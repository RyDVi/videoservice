import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";

function HomePage() {
  useCrmPageTitle("Домашняя страница");
  return <></>;
}

HomePage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default HomePage;
