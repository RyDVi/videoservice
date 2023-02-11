import { useGenres } from "@modules/api";
import { SearchField, CategoriesLists } from "@modules/client";
import { CodesOfCountry } from "@modules/constants";
import { Box, BoxProps, Divider } from "@mui/material";
import React from "react";
import { useSearch } from "./hooks";
import paths from "./paths";
import { ThemeToggleButton } from "../../../packages/theme";

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
        <CategoriesLists
          genres={genres || []}
          years={years}
          countries={countries}
          buildHrefCategory={(subcategory) =>
            paths.subcategory({ category: "фильмы", subcategory })
          }
        />
      </MobileMenuContent>
    </Box>
  );
};
