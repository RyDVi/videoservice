import { useGenres } from "@modules/api";
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
  const { genres } = useGenres();
  const years = React.useMemo(
    () =>
      Array.from(
        { length: 10 },
        (_, index) => new Date().getFullYear() - index
      ),
    []
  );
  const countries = React.useMemo(() => ["RU"] as CodesOfCountry[], []);
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
          <CategoriesLists
            category="фильмы"
            genres={genres || []}
            years={years}
            countries={countries}
          />
          <Divider />
          <ListItemButton
            LinkComponent={Link}
            href={paths.category({ category: "сериалы" })}
          >
            <ListItemText primary="Сериалы" />
          </ListItemButton>
          <CategoriesLists
            category="сериалы"
            genres={genres || []}
            years={years}
            countries={countries}
          />
          <Divider />
          <ListItemButton
            LinkComponent={Link}
            href={paths.category({ category: "мультфильмы" })}
          >
            <ListItemText primary="Мультфильмы" />
          </ListItemButton>
          <CategoriesLists
            category="мультфильмы"
            genres={genres || []}
            years={years}
            countries={countries}
          />
        </List>
      </MobileMenuContent>
    </Box>
  );
};
