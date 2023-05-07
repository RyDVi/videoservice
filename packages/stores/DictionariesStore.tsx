import React from "react";
import { CategoryWithDicts, Genre } from "@modules/api";
import { useCategoriesWithDicts, useGenres } from "@modules/request-hooks";
import { ObjectUtils } from "../utils/objects";

interface DictionariesContextProps {
  genres: Record<string, Genre>;
  categoriesWithDicts: Record<string, CategoryWithDicts>;
}
const DictionariesContext = React.createContext<DictionariesContextProps>({
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
