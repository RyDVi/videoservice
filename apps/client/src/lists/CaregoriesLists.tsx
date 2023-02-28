import styled from "@emotion/styled";
import { CodesOfCountry, COUNTRIES_MAP } from "@modules/constants";
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import * as paths from "../paths";

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
  genres: string[];
  years: number[];
  countries: CodesOfCountry[];
  density?: boolean;
  category: string;
}

export const CategoriesLists: React.FC<CommonCategoriesProps> = ({
  genres,
  years,
  countries,
  density = false,
  category,
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
              <ListItemButton
                key={year}
                LinkComponent={Link}
                href={paths.categoryYear({ category, year: String(year) })}
              >
                <ListItemText primary={year} />
              </ListItemButton>
            ))}
          </List>
        </Grid>
        <Grid>
          <List dense subheader={<ListSubheader>По странам</ListSubheader>}>
            {countries.map((country) => (
              <ListItemButton
                key={country}
                LinkComponent={Link}
                href={paths.categoryCountry({ category, country })}
              >
                <ListItemText primary={COUNTRIES_MAP[country]} />
              </ListItemButton>
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
                <ListItemButton
                  key={genre}
                  component={Link}
                  href={paths.categoryGenre({ category, genre })}
                >
                  <ListItemText primary={genre} />
                </ListItemButton>
              ))}
            </List>
          </Grid>
        ))}
      </Grid>
    </CategoriesContainer>
  );
};
