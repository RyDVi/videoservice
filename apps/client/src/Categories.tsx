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
import paths from "./paths";
import { useThemeControl } from "./theme";
import { CodesOfCountry } from "@modules/constants/country";
import { CategoriesLists, CategoriesTooltip } from "@modules/client";

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
    <>
      <CategoriesTooltip
        title={
          <CategoriesLists
            buildHrefCategory={(subcategory) =>
              paths.subcategory({ category: "фильмы", subcategory })
            }
            genres={genres || []}
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
            buildHrefCategory={(subcategory) =>
              paths.subcategory({ category: "сериал", subcategory })
            }
            genres={genres || []}
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
            buildHrefCategory={(subcategory) =>
              paths.subcategory({ category: "мультфильмы", subcategory })
            }
            genres={genres || []}
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
