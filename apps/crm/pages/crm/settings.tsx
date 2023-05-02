import { CRMContainer } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";

function SettingsPage() {
  return <>Настройки</>;
}

SettingsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default SettingsPage;
