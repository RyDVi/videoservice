import { IconButton, ThemeProvider } from "@mui/material";
import { NAME_THEME_MAP, ThemeType, THEME_NAME_MAP } from "./themes";
import { useThemeControl } from "./ThemeControlContext";
import {
  ThemeControlContext,
  ThemeControlProvider,
} from "./ThemeControlContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import { useLocalStorage } from "@modules/hooks";

export function Theme({
  children,
  defaultTheme,
}: {
  children: React.ReactNode;
  defaultTheme: ThemeType;
}) {
  return (
    <ThemeControlProvider
      themes={NAME_THEME_MAP}
      initialTheme={NAME_THEME_MAP[defaultTheme]}
    >
      <ThemeControlContext.Consumer>
        {({ theme }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>}
      </ThemeControlContext.Consumer>
    </ThemeControlProvider>
  );
}

function useThemeStorage() {
  return useLocalStorage<ThemeType | null>("theme", null);
}

export function ThemeSaver() {
  const { theme } = useThemeControl();
  const [themeFromStorage, saveThemeToStorage] = useThemeStorage();
  React.useEffect(() => {
    if (
      !themeFromStorage ||
      (themeFromStorage && theme !== NAME_THEME_MAP[themeFromStorage])
    ) {
      saveThemeToStorage(THEME_NAME_MAP.get(theme));
    }
  }, [saveThemeToStorage, theme, themeFromStorage]);
  return null;
}

export function ThemeLoader() {
  const { theme, setTheme } = useThemeControl();
  const [themeFromStorage] = useThemeStorage();
  React.useEffect(() => {
    // ВНИМАНИЕ!!! Не делать установку и локального хранилища без useEffect
    // Это приведёт к тому, что на клиенте изменится тема, а на сервере не изменится
    if (themeFromStorage && theme !== NAME_THEME_MAP[themeFromStorage]) {
      setTheme(NAME_THEME_MAP[themeFromStorage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeControl();
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleTheme}
      color="inherit"
      title={
        theme.palette.mode === "light" ? "На тёмную тему" : "На светлую тему"
      }
    >
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon color="primary" />
      ) : (
        <Brightness4Icon color="primary" />
      )}
    </IconButton>
  );
}
