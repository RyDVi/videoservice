import { Container } from '@modules/ui/Containers';
import { H1 } from '@modules/ui/typography/Headers';

const PageContainer = Container.withComponent('section');

interface PageProps {
  title: React.ReactNode;
  children: React.ReactNode;
}
const Page: React.FC<PageProps> = ({ children, title }) => {
  return (
    <PageContainer>
      <H1 sizeAs="h4">{title}</H1>
      {children}
    </PageContainer>
  );
};

export default Page;
