import CRMContainer from 'crmui/containers/shell/CRMContainer';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
import { PageProvider } from 'crmui/contexts/page/PageContext';

const SettingsPage: React.FC = () => {
  return (
    <PageProvider title="Настройки">
      <CRMContainer sidebarContent={<CrmSidebar />}>Settings</CRMContainer>
    </PageProvider>
  );
};

export default SettingsPage;
