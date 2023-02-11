import CRMContainer from 'crmui/containers/shell/CRMContainer';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
import { PageProvider } from 'crmui/contexts/page/PageContext';

const CustomersPage: React.FC = () => {
  return (
    <PageProvider title="Клиенты">
      <CRMContainer sidebarContent={<CrmSidebar />}>Customers</CRMContainer>
    </PageProvider>
  );
};

export default CustomersPage;
