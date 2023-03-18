import { useCategoriesWithDicts } from "@modules/api";
import { SearchField } from "@modules/client";
import { CodesOfCountry } from "@modules/constants";
import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import React from "react";
import { useSearch } from "./hooks";
import { ThemeToggleButton } from "@modules/theme";
import { CategoriesLists } from "./lists";
import Link from "next/link";
import * as paths from "./paths";

const SidebarHeader = styled(Box)({
  width: '100%',
  padding: '1rem',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SidebarContainer = styled(Box)({ padding: 1 });

export const SidebarContent: React.FC = () => {
  const { search } = useSearch();
  const { categories } = useCategoriesWithDicts({});
  const filmCategory = React.useMemo(
    () => categories?.find((c) => c.slug.toLowerCase() === "фильмы"),
    [categories]
  );
  const serialsCategory = React.useMemo(
    () => categories?.find((c) => c.slug.toLowerCase() === "сериалы"),
    [categories]
  );
  const multfilmsCategory = React.useMemo(
    () => categories?.find((c) => c.slug.toLowerCase() === "мультфильмы"),
    [categories]
  );
  return (
    <Box sx={{ width: "90vw" }}>
      <SidebarHeader>
        <SearchField onSearch={search} />
        <ThemeToggleButton />
      </SidebarHeader>
      <Divider />
      <SidebarContainer>
        <List>
          <ListItemButton
            LinkComponent={Link}
            href={paths.category({ category: "фильмы" })}
          >
            <ListItemText primary="Фильмы" />
          </ListItemButton>
          {filmCategory && (
            <CategoriesLists
              category="фильмы"
              genres={filmCategory.genres}
              years={filmCategory.years}
              countries={filmCategory.countries as CodesOfCountry[]}
              density
            />
          )}
          <Divider />
          <ListItemButton
            LinkComponent={Link}
            href={paths.category({ category: "сериалы" })}
          >
            <ListItemText primary="Сериалы" />
          </ListItemButton>
          {serialsCategory && (
            <CategoriesLists
              category="сериал"
              genres={serialsCategory.genres}
              years={serialsCategory.years}
              countries={serialsCategory.countries as CodesOfCountry[]}
              density
            />
          )}
          <Divider />
          <ListItemButton
            LinkComponent={Link}
            href={paths.category({ category: "мультфильмы" })}
          >
            <ListItemText primary="Мультфильмы" />
          </ListItemButton>
          {multfilmsCategory && (
            <CategoriesLists
              category="мультфильмы"
              genres={multfilmsCategory.genres}
              years={multfilmsCategory.years}
              countries={multfilmsCategory.countries as CodesOfCountry[]}
              density
            />
          )}
        </List>
      </SidebarContainer>
    </Box>
  );
};
