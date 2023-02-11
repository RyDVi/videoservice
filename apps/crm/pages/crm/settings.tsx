import { PageProvider, CRMContainer, CrmSidebar } from "crmui";

const SettingsPage: React.FC = () => {
  return (
    <PageProvider title="Настройки">
      <CRMContainer sidebarContent={<CrmSidebar />}>Settings</CRMContainer>
    </PageProvider>
  );
};

export default SettingsPage;
