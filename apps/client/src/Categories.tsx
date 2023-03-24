import { useCategoriesWithDicts } from "@modules/api";
import {
  Box,
  Button,
  ButtonProps,
  SimplePaletteColorOptions,
  Typography,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  styled,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import * as paths from "./paths";
import { useThemeControl } from "../../../packages/theme";
import { CodesOfCountry } from "@modules/constants/country";
import { CategoriesLists } from "./lists";
import { useForceUpdate } from "@modules/hooks";

interface CategoryButtonProps extends ButtonProps {
  href: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  href,
  children,
  onClick,
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
            decodeURI(router.asPath).includes(href) ? activeColor : theme.palette.text?.primary,
          textDecoration: "none",
          ":hover": { color: activeColor, backgroundColor: "transparent" },
          display: "inline-block", // временный хак для убирания подчеркивания
        }}
        onClick={onClick}
        {...props}
      >
        <Typography variant="h6" component="span">
          {children}
        </Typography>
      </Button>
    </Link>
  );
};

const CategoriesTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 800,
  },
});

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
  // Хак для предотвращения исчезания поповера
  const [refreshKey, forceUpdate] = useForceUpdate();
  return (
    <>
      {filmCategory && (
        <CategoriesTooltip
          title={
            <CategoriesLists
              key={refreshKey}
              category="фильмы"
              genres={filmCategory.genres}
              years={filmCategory.years}
              countries={filmCategory.countries as CodesOfCountry[]}
              density
              onClick={forceUpdate}
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
              key={refreshKey}
              category="сериалы"
              genres={serialsCategory.genres}
              years={serialsCategory.years}
              countries={serialsCategory.countries as CodesOfCountry[]}
              density
              onClick={forceUpdate}
            />
          }
        >
          <Box>
            <CategoryButton href={paths.category({ category: "сериалы" })}>
              Сериалы
            </CategoryButton>
          </Box>
        </CategoriesTooltip>
      )}
      {multfilmsCategory && (
        <CategoriesTooltip
          title={
            <CategoriesLists
              key={refreshKey}
              category="мультфильмы"
              genres={multfilmsCategory.genres}
              years={multfilmsCategory.years}
              countries={multfilmsCategory.countries as CodesOfCountry[]}
              density
              onClick={forceUpdate}
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
