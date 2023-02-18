import {
  PageHeader,
  PageContainer,
  SearchField,
  MenuSidebarProvider,
  SidebarCloser,
} from "@modules/client";
import { LogoSvg } from "@modules/client/svg";
import Link from "next/link";
import { Categories } from "./Categories";
import { useSearch } from "./hooks";
import { MobileMenu } from "./MobileMenuContent";
import * as paths from "./paths";
import { ThemeToggleButton } from "./theme";

interface AppPageProps {
  children?: React.ReactElement;
}

export const AppPage: React.FC<AppPageProps> = ({ children }) => {
  const { search } = useSearch();
  return (
    <MenuSidebarProvider>
      <SidebarCloser />
      <PageContainer
        sx={{ minHeight: "100vh", height: "100vh" }}
        header={
          <PageHeader
            logo={
              <Link href={paths.root({})}>
                <LogoSvg />
              </Link>
            }
            actions={
              <>
                <ThemeToggleButton />
                <Categories />
              </>
            }
            search={<SearchField onSearch={search} />}
            sidebarContent={<MobileMenu />}
          />
        }
      >
        {children}
      </PageContainer>
    </MenuSidebarProvider>
  );
};
