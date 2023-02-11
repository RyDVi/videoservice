import { Theme } from "@mui/material";
import React from "react";
import { useMethods } from "@modules/hooks";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}
export const ThemeControlContext = React.createContext<ThemeContextProps>({
  theme: null as any,
  toggleTheme: () => null,
});

interface ThemePropviderProps {
  children: React.ReactNode;
  themes: Record<"dark" | "light", Theme>;
}

export const ThemeControlProvider: React.FC<ThemePropviderProps> = ({
  children,
  themes,
}) => {
  const [state, methods] = useMethods(
    {
      toggleTheme: (state) => ({
        ...state,
        theme:
          state.theme.palette.mode === "light" ? themes.dark : themes.light,
      }),
    },
    { theme: themes.dark }
  );
  const themeControlValue = React.useMemo(
    () => ({ ...state, ...methods }),
    [methods, state]
  );
  return (
    <ThemeControlContext.Provider value={themeControlValue}>
      {children}
    </ThemeControlContext.Provider>
  );
};

export function useThemeControl() {
  const themeControlContext = React.useContext(ThemeControlContext);
  if (!themeControlContext) {
    throw new Error("ThemeControlContext is not available");
  }
  return themeControlContext;
}
