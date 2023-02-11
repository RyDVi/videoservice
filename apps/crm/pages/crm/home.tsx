import CRMContainer from 'crmui/containers/shell/CRMContainer';
import { PageProvider } from 'crmui/contexts/page/PageContext';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
const HomePage: React.FC = () => {
  return (
    <PageProvider title="Домашняя страница">
      <CRMContainer sidebarContent={<CrmSidebar />}></CRMContainer>
    </PageProvider>
  );
};

export default HomePage;
