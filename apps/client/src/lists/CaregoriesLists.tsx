import { ListItemButtonProps, styled } from "@mui/material";
import { CodesOfCountry, COUNTRIES_MAP } from "@modules/constants";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import * as paths from "../paths";
import { useRouter } from "next/router";

const CategoriesContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "density",
})<{ density?: boolean }>(({ density, theme }) => ({
  "& .MuiListItemButton-root": {
    ...(density && { padding: "2px 6px" }),
  },
  "& .MuiListSubheader-root": {
    ...(density && { padding: "0px 6px", lineHeight: "36px" }),
    backgroundColor: "transparent",
    color: theme.palette.primary?.main,
  },
}));

const CategoryListItemText = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>(
  ({ theme, isActive }) => isActive && { color: theme.palette.primary?.light }
);

export const CategoryListItemButton: React.FC<
  ListItemButtonProps & { href: string; primaryText: React.ReactNode }
> = ({ href, primaryText, ...props }) => {
  const router = useRouter();
  const isActive = React.useCallback(
    (href: string) => decodeURI(router.asPath).includes(href) || undefined,
    [router.asPath]
  );
  return (
    // TODO: пофиксить any
    <ListItemButton {...props as any} component={Link} href={href}>
      <CategoryListItemText primary={primaryText} isActive={isActive(href)} />
    </ListItemButton>
  );
};

interface CommonCategoriesProps {
  genres: string[];
  years: number[];
  countries: CodesOfCountry[];
  density?: boolean;
  category: string;
  onClick?: () => void;
}

export const CategoriesLists: React.FC<CommonCategoriesProps> = ({
  genres,
  years,
  countries,
  density = false,
  category,
  onClick,
}) => {
  const genresByColumns = React.useMemo(() => {
    const countGenresInColumn = 10;
    return Array.from(
      { length: Math.ceil(genres.length / countGenresInColumn) },
      (_, index) => {
        const fromIndex = index * countGenresInColumn;
        return genres.slice(fromIndex, fromIndex + countGenresInColumn);
      }
    );
  }, [genres]);
  return (
    <CategoriesContainer density={density}>
      <Grid container columns={8}>
        <Grid>
          <List dense subheader={<ListSubheader>По годам</ListSubheader>}>
            {years.map((year) => (
              <CategoryListItemButton
                key={year}
                href={paths.categoryYear({ category, year: String(year) })}
                onClick={onClick}
                primaryText={year}
              />
            ))}
          </List>
        </Grid>
        <Grid>
          <List dense subheader={<ListSubheader>По странам</ListSubheader>}>
            {countries.map((country) => (
              <CategoryListItemButton
                key={country}
                href={paths.categoryCountry({ category, country })}
                onClick={onClick}
                primaryText={COUNTRIES_MAP[country]}
              />
            ))}
          </List>
        </Grid>
        {genresByColumns.map((columnOfGenres, index) => (
          <Grid key={index}>
            <List
              dense
              subheader={
                <ListSubheader>
                  {index === 0 ? "По жанрам" : <>&nbsp;</>}
                </ListSubheader>
              }
            >
              {columnOfGenres.map((genre) => (
                <CategoryListItemButton
                  key={genre}
                  href={paths.categoryGenre({ category, genre })}
                  onClick={onClick}
                  primaryText={genre}
                />
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </CategoriesContainer>
  );
};
