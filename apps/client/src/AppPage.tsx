import {
  PageContainer,
  SearchField,
  SidebarProvider,
  SidebarCloser,
  UpTabletScreen,
  DownTabletScreen,
  Sidebar,
  SidebarToggler,
  HelpButton,
  HelpSearchFilmText,
  FloatingSearchChatButton,
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
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Categories } from "./Categories";
import { useSearch } from "./hooks";
import { SidebarContent } from "./SidebarContent";
import * as paths from "./paths";
import { useDictionariesContext } from "@modules/stores";
import { COUNTRIES_MAP } from "@modules/constants";

const PageHeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.pageBackground?.main,
  boxShadow: "0 1px 5px 0 rgb(0 0 0 / 15%)",
  display: "flex",
  alignItems: "center",
  padding: "0 1rem",
  position: "sticky",
  top: 0,
  zIndex: 10,
}));

interface AppProps {
  logo?: React.ReactElement;
  actions?: React.ReactElement;
  search?: React.ReactElement;
  sidebarButton?: React.ReactNode;
}

const PageHeader: React.FC<AppProps> = ({
  logo,
  search,
  actions,
  sidebarButton,
  ...props
}) => (
  <PageHeaderContainer {...props}>
    <Box sx={{ height: 70 }}>{logo}</Box>
    <UpTabletScreen>
      <Box sx={{ display: "flex", alignItems: "center" }}>{actions}</Box>
      <Box sx={{ marginLeft: "auto" }}>{search}</Box>
    </UpTabletScreen>
    <DownTabletScreen>
      <Box sx={{ marginLeft: "auto" }}>{sidebarButton}</Box>
    </DownTabletScreen>
  </PageHeaderContainer>
);

interface PageFooterProps {
  logo: React.ReactNode;
}

const PageFooter: React.FC<PageFooterProps> = ({ logo }) => (
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

const AppPageFooter = React.memo(PageFooter);

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

function usePageBreadcrumbs() {
  const router = useRouter();
  const filmSlug = (router.query.filmSlug as string) || "Фильм";
  const category = (router.query.category as string) || "Категория";
  const categories = useDictionariesContext().categoriesWithDicts;
  const genres = useDictionariesContext().genres;
  const genresBreadcrumbs = React.useMemo(() => {
    if (!Object.values(genres).length) {
      // genres может быть ещё не получен, в таком случае выдаст ошибку
      return {};
    }
    return Object.fromEntries(
      Object.values(categories)
        .map((category) =>
          category.genres.map((genreId) => [
            paths.categoryGenre({
              category: category.slug,
              genre: genres[genreId].slug,
            }),
            { text: genres[genreId].name },
          ])
        )
        .flat()
    );
  }, [genres, categories]);
  const countriesBreadcrumbs = React.useMemo(
    () =>
      Object.fromEntries(
        Object.values(categories)
          .map((category) =>
            Object.entries(COUNTRIES_MAP).map(([code, countryName]) => [
              paths.categoryCountry({ category: category.slug, country: code }),
              { text: countryName },
            ])
          )
          .flat()
      ),
    [categories]
  );
  const categoriesBreadcrumbs = React.useMemo(
    () =>
      Object.fromEntries(
        Object.values(categories).map((category) => [
          paths.category({ category: category.slug }),
          { text: category.name },
        ])
      ),
    [categories]
  );
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
    ...genresBreadcrumbs,
    ...categoriesBreadcrumbs,
    ...countriesBreadcrumbs,
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
    <SidebarProvider>
      <SidebarCloser />
      <Sidebar>
        <SidebarContent />
      </Sidebar>
      <PageContainer
        sx={{ minHeight: "100vh", height: "100vh", position: "relative" }}
        header={
          <PageHeader
            logo={
              <Link href={paths.root({})}>
                <LogoSvg />
              </Link>
            }
            actions={
              <>
                {/* <ThemeToggleButton /> */}
                <Categories />
              </>
            }
            search={
              <SearchField
                onSearch={search}
                endButtons={
                  <HelpButton>
                    <HelpSearchFilmText />
                  </HelpButton>
                }
                placeholder="Введите название или опишите фильм"
              />
            }
            sidebarButton={<SidebarToggler />}
          />
        }
        breadcrumbs={<PageBreadcrumbs breadcrumbs={pageBreadcrumbs} />}
        footer={<AppPageFooter logo={<LogoSvg />} />}
      >
        {children}
        <FloatingSearchChatButton />
      </PageContainer>
    </SidebarProvider>
  );
};
