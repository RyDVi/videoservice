import { HelpButton, HelpSearchFilmText, SearchField } from "@modules/client";
import { CodesOfCountry } from "@modules/constants";
import { useDictionariesContext } from "@modules/stores";
import { Box, Divider, List, styled } from "@mui/material";
import React from "react";
import { useSearch } from "./hooks";
import { CategoriesLists, CategoryListItemButton } from "./lists";
import * as paths from "./paths";

const SidebarHeader = styled(Box)({
  width: "100%",
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SidebarContainer = styled(Box)({ padding: 1 });

const SidebarListContent = styled(List)({
  ".MuiListItemButton-root, >.MuiBox-root": { padding: "6px 12px" },
  ">.MuiListItemButton-root>.MuiListItemText-root": { paddingLeft: 6 },
});

export const SidebarContent: React.FC = () => {
  const { search } = useSearch();
  const categoriesWithDicts = useDictionariesContext().categoriesWithDicts;
  const categories = Object.values(categoriesWithDicts);
  return (
    <Box sx={{ width: "90vw" }}>
      <SidebarHeader>
        <SearchField
          onSearch={search}
          endButtons={
            <HelpButton>
              <HelpSearchFilmText />
            </HelpButton>
          }
          placeholder="Введите название или опишите фильм"
        />
        {/* <ThemeToggleButton /> */}
      </SidebarHeader>
      <Divider />
      <SidebarContainer>
        <SidebarListContent>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <CategoryListItemButton
                href={paths.category({ category: category.slug })}
                primaryText={category.name}
              />
              {category && (
                <CategoriesLists
                  category={category.slug}
                  genres={category.genres}
                  years={category.years}
                  countries={category.countries as CodesOfCountry[]}
                  density
                />
              )}
              <Divider />
            </React.Fragment>
          ))}
        </SidebarListContent>
      </SidebarContainer>
    </Box>
  );
};
