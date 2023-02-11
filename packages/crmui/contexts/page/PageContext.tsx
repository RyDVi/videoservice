import React from 'react';
import { initialPageInfo, PageInfo, PageInfoActions, pageInfoReducer } from './PageInfo';

const initial: PageState = {
  pageInfo: initialPageInfo,
};

interface PageState {
  pageInfo: PageInfo;
}

type PageActions = PageInfoActions;

function pageReducer(state: PageState, action: PageActions): PageState {
  switch (action.type) {
    case 'set/pageTitle':
      return { ...state, pageInfo: pageInfoReducer(state.pageInfo, action) };
  }
}

interface PageContextProps {
  state: PageState;
  actions: {
    setPageTitle: (title: React.ReactNode) => void;
  };
}

const PageContext = React.createContext<PageContextProps>({
  state: initial,
  actions: {
    setPageTitle: () => null,
  },
});

interface PageProviderProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children, title }) => {
  const initialReducerProps: PageState = React.useMemo(
    () => ({
      pageInfo: {
        title,
      },
    }),
    [title]
  );
  const [state, dispatch] = React.useReducer(pageReducer, initialReducerProps);

  const setPageTitle = React.useCallback((title: React.ReactNode) => {
    dispatch({ type: 'set/pageTitle', payload: title });
  }, []);

  const valueContext: PageContextProps = React.useMemo(
    () => ({
      state: {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          title,
        },
      },
      actions: {
        setPageTitle,
      },
    }),
    [state, title, setPageTitle]
  );
  return <PageContext.Provider value={valueContext}>{children}</PageContext.Provider>;
};

export function usePageContext() {
  const pageContext = React.useContext(PageContext);
  if (!pageContext) {
    throw new Error('PageContext is not provided.');
  }
  return pageContext;
}
