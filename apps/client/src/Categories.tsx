import { useGenres } from "@modules/api";
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
  const { genres: filmGenres } = useGenres({ category: "фильмы" });
  const { genres: serialGenres } = useGenres({ category: "сериалы" });
  const { genres: multfilmsGenres } = useGenres({ category: "мультфильмы" });
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
    <>
      <CategoriesTooltip
        title={
          <CategoriesLists
            category="фильмы"
            genres={filmGenres || []}
            years={years}
            countries={countries}
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
      <CategoriesTooltip
        title={
          <CategoriesLists
            category="сериал"
            genres={serialGenres || []}
            years={years}
            countries={countries}
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
      <CategoriesTooltip
        title={
          <CategoriesLists
            category="мультфильмы"
            genres={multfilmsGenres || []}
            years={years}
            countries={countries}
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
    </>
  );
};
