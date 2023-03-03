import {
  PageHeader,
  PageContainer,
  SearchField,
  MenuSidebarProvider,
  SidebarCloser,
} from "@modules/client";
import { LogoSvg } from "@modules/client/svg";
import {
  useRouterBreadcrumbs,
  UseRouterBreadcrumbsResult,
} from "@modules/nextjs";
import {
  Box,
  Typography,
  Link as MuiLink,
  Paper,
  Breadcrumbs,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Categories } from "./Categories";
import { useSearch } from "./hooks";
import { MobileMenu } from "./MobileMenuContent";
import * as paths from "./paths";
import { ThemeToggleButton } from "./theme";

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

const PageBreadcrumbs: React.FC<{
  breadcrumbs: UseRouterBreadcrumbsResult[];
}> = ({ breadcrumbs }) => {
  if (breadcrumbs.length <= 1) {
    return null;
  }
  return (
    <Breadcrumbs sx={{ p: 3, pt: 1, pb: 1 }}>
      {breadcrumbs.map((breadcrumb) => {
        if (breadcrumb.hidden) {
          return null;
        }
        return (
          <MuiLink
            key={breadcrumb.href}
            component={breadcrumb.disabled ? "span" : Link}
            href={breadcrumb.href}
            underline={breadcrumb.disabled ? "none" : "hover"}
          >
            {breadcrumb.text}
          </MuiLink>
        );
      })}
    </Breadcrumbs>
  );
};

//TODO: вынести отсюда в какой-нибудь src, чтобы @modules/client не знал об этом хуке и как именовать бредкрамбы
function usePageBreadcrumbs() {
  const router = useRouter();
  const filmSlug = (router.query.filmSlug as string) || "Фильм";
  const category = (router.query.category as string) || "Категория";
  const breadcrumbs = useRouterBreadcrumbs({
    [paths.root({})]: { text: "Главная" },
    [paths.film({ film: filmSlug })]: { text: "Фильм", disabled: true },
    [paths.categories({})]: { text: "Категория", disabled: true },
    [paths.categoryCountries({ category })]: { text: "Страна", disabled: true },
    [paths.categoryGenres({ category })]: { text: "Жанр", disabled: true },
    [paths.categoryYears({ category })]: { text: "Год", disabled: true },
    [paths.feedback({})]: { text: "Обратная связь", disabled: true },
    [paths.copyright({})]: { text: "Правообладателям", disabled: true },
    [paths.baseSearch({})]: { text: "Поиск", disabled: true },
  });
  return breadcrumbs;
}

interface AppPageProps {
  children?: React.ReactElement;
}

export const AppPage: React.FC<AppPageProps> = ({ children }) => {
  const { search } = useSearch();
  const pageBreadcrumbs = usePageBreadcrumbs();
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
        breadcrumbs={<PageBreadcrumbs breadcrumbs={pageBreadcrumbs} />}
        footer={<PageFooter logo={<LogoSvg />} />}
      >
        {children}
      </PageContainer>
    </MenuSidebarProvider>
  );
};
