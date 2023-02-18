import { useCategoriesWithDicts, useGenres } from "@modules/api";
import {
  Box,
  Button,
  ButtonProps,
  SimplePaletteColorOptions,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as paths from "./paths";
import { useThemeControl } from "../../../packages/theme";
import { CodesOfCountry } from "@modules/constants/country";
import { CategoriesLists, CategoriesTooltip } from "./lists";

interface CategoryButtonProps extends ButtonProps {
  href: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  href,
  children,
  ...props
}) => {
  const router = useRouter();
  const { theme } = useThemeControl();
  const activeColor = (theme.palette.primary as SimplePaletteColorOptions)
    ?.main;

  return (
    <Link href={href}>
      <Button
        sx={{
          color:
            router.asPath === href ? activeColor : theme.palette.text?.primary,
          textDecoration: "none",
          ":hover": { color: activeColor, backgroundColor: "transparent" },
          display: "inline-block", // временный хак для убирания подчеркивания
        }}
        {...props}
      >
        <Typography variant="h6" component="span">
          {children}
        </Typography>
      </Button>
    </Link>
  );
};

export const Categories: React.FC = () => {
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
  const countries = React.useMemo(() => ["RU"] as CodesOfCountry[], []);
  return (
    <>
      {filmCategory && (
        <CategoriesTooltip
          title={
            <CategoriesLists
              category="фильмы"
              genres={filmCategory.genres}
              years={filmCategory.years}
              countries={filmCategory.countries as CodesOfCountry[]}
              density
            />
          }
        >
          <Box>
            <CategoryButton href={paths.category({ category: "фильмы" })}>
              Фильмы
            </CategoryButton>
          </Box>
        </CategoriesTooltip>
      )}
      {serialsCategory && (
        <CategoriesTooltip
          title={
            <CategoriesLists
              category="сериал"
              genres={serialsCategory.genres}
              years={serialsCategory.years}
              countries={serialsCategory.countries as CodesOfCountry[]}
              density
            />
          }
        >
          <Box>
            <CategoryButton href={paths.category({ category: "сериал" })}>
              Сериалы
            </CategoryButton>
          </Box>
        </CategoriesTooltip>
      )}
      {multfilmsCategory && (
        <CategoriesTooltip
          title={
            <CategoriesLists
              category="мультфильмы"
              genres={multfilmsCategory.genres}
              years={multfilmsCategory.years}
              countries={multfilmsCategory.countries as CodesOfCountry[]}
              density
            />
          }
        >
          <Box>
            <CategoryButton href={paths.category({ category: "мультфильмы" })}>
              Мультфильмы
            </CategoryButton>
          </Box>
        </CategoriesTooltip>
      )}
    </>
  );
};
