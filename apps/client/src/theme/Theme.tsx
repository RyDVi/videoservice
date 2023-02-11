import { IconButton, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";
import { useThemeControl } from "./ThemeControlContext";
import {
  ThemeControlContext,
  ThemeControlProvider,
} from "./ThemeControlContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export const Theme: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeControlProvider
      themes={{
        dark: darkTheme,
        light: lightTheme,
      }}
    >
      <ThemeControlContext.Consumer>
        {({ theme }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>}
      </ThemeControlContext.Consumer>
    </ThemeControlProvider>
  );
};

export const ThemeToggleButton: React.FC = () => {
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
};
