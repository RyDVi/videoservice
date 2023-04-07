import { COUNTRIES_MAP } from "@modules/constants";
import { useDictionariesContext } from "@modules/stores";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function useSubcategoryName(subcategory: string, slug: string) {
  const { genres } = useDictionariesContext();
  return React.useMemo(() => {
    if (subcategory === "country") {
      return COUNTRIES_MAP[slug as keyof typeof COUNTRIES_MAP] || "";
    }
    if (subcategory === "year") {
      return slug;
    }
    if (subcategory === "genre") {
      return Object.values(genres).find((g) => g.slug === slug)?.name || "";
    }
    return "";
  }, [subcategory, slug, genres]);
}

function useCategoryName(categorySlug: string) {
  const { categoriesWithDicts } = useDictionariesContext();
  return React.useMemo(
    () =>
      Object.values(categoriesWithDicts).find((c) => c.slug === categorySlug)
        ?.name || "",
    [categoriesWithDicts, categorySlug]
  );
}

export function CategoryTitle() {
  const router = useRouter();

  const categorySlug = router.query.category as string;
  const categoryName = useCategoryName(categorySlug);

  const subcategorySlug = router.query.name as string;
  const subcategory = router.query.subcategory as string;
  const subcategoryName = useSubcategoryName(subcategory, subcategorySlug);

  return (
    <Head>
      <title>
        {categoryName} {subcategoryName} смотреть онлайн
      </title>
    </Head>
  );
}
