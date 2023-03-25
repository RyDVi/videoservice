import React from "react";
import {
  CategoryWithDicts,
  Genre,
  useCategoriesWithDicts,
  useGenres,
} from "@modules/api";
import { ObjectUtils } from "../utils/objects";

interface DictionariesContext {
  genres: Record<string, Genre>;
  categoriesWithDicts: Record<string, CategoryWithDicts>;
}
const DictionariesContext = React.createContext<DictionariesContext>({
  genres: {},
  categoriesWithDicts: {},
});

export const DictionariesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { genres } = useGenres({});
  const { categories } = useCategoriesWithDicts({});
  const contextValue = React.useMemo(
    () => ({
      genres: genres ? ObjectUtils.keyBy(genres, "id") : {},
      categoriesWithDicts: categories
        ? ObjectUtils.keyBy(categories, "id")
        : {},
    }),
    [genres, categories]
  );
  return (
    <DictionariesContext.Provider value={contextValue}>
      {children}
    </DictionariesContext.Provider>
  );
};

export function useDictionariesContext() {
  const context = React.useContext(DictionariesContext);
  if (context === undefined) {
    throw new Error(
      "useDictionariesContext must be used within a DictionariesProvider"
    );
  }
  return context;
}
