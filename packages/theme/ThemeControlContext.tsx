import { Theme } from "@mui/material";
import React from "react";
import { useMethods } from "@modules/hooks";
import { ThemeType } from "./theme";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
export const ThemeControlContext = React.createContext<ThemeContextProps>({
  theme: null as any,
  toggleTheme: () => null,
  setTheme: () => null,
});

interface ThemePropviderProps {
  children: React.ReactNode;
  themes: Record<ThemeType, Theme>;
  initialTheme: Theme;
}

export const ThemeControlProvider: React.FC<ThemePropviderProps> = ({
  children,
  themes,
  initialTheme
}) => {
  const [state, methods] = useMethods(
    {
      toggleTheme: (state) => ({
        ...state,
        theme:
          state.theme.palette.mode === "light" ? themes.dark : themes.light,
      }),
      setTheme: (state, theme: Theme) => ({ ...state, theme }),
    },
    { theme: initialTheme }
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
