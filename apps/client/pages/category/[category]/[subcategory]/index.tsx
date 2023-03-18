import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "../../../../src/AppPage";
import * as paths from "../../../../src/paths";

export default function SubcategoryPage() {
  const router = useRouter();
  const category = router.query.category as string;
  React.useEffect(() => {
    if(!category){
        return
    }
    router.replace(paths.category({ category }));
  }, [category, router]);
  return <></>;
}

SubcategoryPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
