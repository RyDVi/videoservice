import {
  PageHeader,
  PageContainer,
  SearchField,
  MenuSidebarProvider,
  SidebarCloser,
} from "@modules/client";
import { LogoSvg } from "@modules/client/svg";
import { Box, Typography, Link as MuiLink, Paper } from "@mui/material";
import Link from "next/link";
import { Categories } from "./Categories";
import { useSearch } from "./hooks";
import { MobileMenu } from "./MobileMenuContent";
import * as paths from "./paths";
import { ThemeToggleButton } from "./theme";
import { EmailLink } from "./Contacts";

interface PageFooterProps {
  logo: React.ReactNode;
}

const PageFooter: React.FC<PageFooterProps> = ({ logo }) => {
  return (
    <Paper
      component="footer"
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: "auto",
      }}
      elevation={1}
    >
      <Box sx={{ height: "60px" }}>{logo}</Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MuiLink component={Link} href={paths.feedback({})} underline="hover">
          <Typography>Обратная связь</Typography>
        </MuiLink>
        <MuiLink component={Link} href={paths.copyright({})} underline="hover">
          <Typography>Правообладателям</Typography>
        </MuiLink>
      </Box>
    </Paper>
  );
};

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
        footer={<PageFooter logo={<LogoSvg />} />}
      >
        {children}
      </PageContainer>
    </MenuSidebarProvider>
  );
};
