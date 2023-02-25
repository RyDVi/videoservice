import { CRMContainer, CrmSidebar } from "crmui";

function SettingsPage() {
  return <>Настройки</>;
}

SettingsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default SettingsPage;
