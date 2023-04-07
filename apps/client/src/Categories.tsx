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
import { useThemeControl } from "@modules/theme";
import { CodesOfCountry } from "@modules/constants/country";
import { CategoriesLists } from "./lists";
import { useForceUpdate } from "@modules/hooks";
import { useDictionariesContext } from "@modules/stores";

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
          color: router.asPath.includes(href)
            ? activeColor
            : theme.palette.text?.primary,
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
  const categoriesWithDicts = useDictionariesContext().categoriesWithDicts;
  const categories = Object.values(categoriesWithDicts);
  // Хак для предотвращения исчезания поповера
  const [refreshKey, forceUpdate] = useForceUpdate();
  return (
    <>
      {categories?.map((category) => (
        <CategoriesTooltip
          key={category.slug}
          title={
            <CategoriesLists
              key={refreshKey}
              category={category.slug}
              genres={category.genres}
              years={category.years}
              countries={category.countries as CodesOfCountry[]}
              density
              onClick={forceUpdate}
            />
          }
        >
          <Box>
            <CategoryButton href={paths.category({ category: category.slug })}>
              {category.name}
            </CategoryButton>
          </Box>
        </CategoriesTooltip>
      ))}
    </>
  );
};
