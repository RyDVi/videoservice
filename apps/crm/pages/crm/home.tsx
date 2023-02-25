import { CrmSidebar, CRMContainer, useCrmPageTitle } from "crmui";

function HomePage() {
  useCrmPageTitle("Домашняя страница");
  return <></>;
}

HomePage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default HomePage;
