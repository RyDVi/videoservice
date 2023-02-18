import { useCategoriesWithDicts, useGenres } from "@modules/api";
import { SearchField } from "@modules/client";
import { CodesOfCountry } from "@modules/constants";
import {
  Box,
  BoxProps,
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useSearch } from "./hooks";
import { ThemeToggleButton } from "../../../packages/theme";
import { CategoriesLists } from "./lists";
import Link from "next/link";
import * as paths from "./paths";

interface MobileMenuHeaderProps extends BoxProps {}

const MobileMenuHeader: React.FC<MobileMenuHeaderProps> = ({ ...props }) => {
  return (
    <Box
      sx={{
        width: 1,
        padding: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    />
  );
};

interface MobileMenuContent extends BoxProps {}

const MobileMenuContent: React.FC<MobileMenuContent> = (props) => (
  <Box sx={{ padding: 1 }} {...props} />
);

export const MobileMenu: React.FC = () => {
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
      <MobileMenuHeader>
        <SearchField onSearch={search} />
        <ThemeToggleButton />
      </MobileMenuHeader>
      <Divider />
      <MobileMenuContent>
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
      </MobileMenuContent>
    </Box>
  );
};
