import styled from "@emotion/styled";
import { Genre } from "@modules/api";
import { CodesOfCountry } from "@modules/constants";
import {
  Box,
  Grid,
  List,
  ListSubheader,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { CountryListItem } from "./CountryList";
import { GenreListItem } from "./GenreList";
import { YearListItem } from "./YearsList";

export const CategoriesTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  )
)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 800,
  },
});

const CategoriesContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "density",
})<{ density?: boolean }>((props) => ({
  "& .MuiListItemButton-root": {
    ...(props.density && { padding: "2px 6px" }),
  },
  "& .MuiListSubheader-root": {
    ...(props.density && { padding: "0px 6px", lineHeight: "36px" }),
    backgroundColor: "transparent",
    color: props.theme.palette.primary?.main,
  },
}));
interface CommonCategoriesProps {
  buildHrefCategory: (category: string) => string;
  genres: Genre[];
  years: number[];
  countries: CodesOfCountry[];
  density?: boolean;
}

export const CategoriesLists: React.FC<CommonCategoriesProps> = ({
  buildHrefCategory,
  genres,
  years,
  countries,
  density = false,
}) => {
  const genresByColumns = React.useMemo(() => {
    const countGenresInColumn = 10;
    return Array.from(
      { length: genres.length / countGenresInColumn },
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
              <YearListItem
                key={year}
                year={year}
                component={Link}
                href={buildHrefCategory(String(year))}
              />
            ))}
          </List>
        </Grid>
        <Grid>
          <List dense subheader={<ListSubheader>По странам</ListSubheader>}>
            {countries.map((country) => (
              <CountryListItem
                key={country}
                country={country}
                component={Link}
                href={buildHrefCategory(country)}
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
                <GenreListItem
                  key={genre.id}
                  genre={genre}
                  component={Link}
                  href={buildHrefCategory(genre.name)}
                />
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </CategoriesContainer>
  );
};
