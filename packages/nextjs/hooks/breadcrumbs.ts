import { useRouter } from "next/router";
import React from "react";

interface BreadcrumbsMap {
  text?: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
}

export interface UseRouterBreadcrumbsResult {
  href: string;
  text: React.ReactNode;
  hidden: boolean;
  disabled: boolean;
}

export function useRouterBreadcrumbs(
  mapping: Record<string, BreadcrumbsMap> = {}
): UseRouterBreadcrumbsResult[] {
  const router = useRouter();
  const breadcrumbs = React.useMemo(() => {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = decodeURI(router.asPath.split("?")[0]);
    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split("/")
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumblist = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
      // The title will just be the route string for now
      const title = subpath;
      const customMap = mapping[href];
      return {
        href,
        text: customMap?.text || title,
        hidden: customMap?.hidden || false,
        disabled: customMap?.disabled || false,
      };
    });
    return [
      {
        href: "/",
        text: mapping["/"]?.text || "Home",
        hidden: mapping["/"]?.hidden || false,
        disabled: mapping["/"]?.disabled || false,
      },
      ...crumblist,
    ];
  }, [mapping, router.asPath]);
  return breadcrumbs;
}
