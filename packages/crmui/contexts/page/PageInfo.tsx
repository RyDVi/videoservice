export interface PageInfo {
  title: React.ReactNode;
}

interface SetPageTitle {
  type: "set/pageTitle";
  payload: React.ReactNode;
}

export type PageInfoActions = SetPageTitle;

export function pageInfoReducer(
  state: PageInfo,
  action: PageInfoActions
): PageInfo {
  switch (action.type) {
    case "set/pageTitle":
      return { ...state, title: action.payload };
  }
}

export const initialPageInfo: PageInfo = {
  title: "<Page title not set>",
};
