import {
  createTheme,
  PaletteOptions,
  SimplePaletteColorOptions,
  Theme,
} from "@mui/material/styles";
import { red, grey } from "@mui/material/colors";

interface DefaultPaletteOptions extends PaletteOptions {
  primary?: SimplePaletteColorOptions;
  secondary?: SimplePaletteColorOptions;
  error?: SimplePaletteColorOptions;
}
declare module "@mui/material/styles" {
  interface Theme {
    palette: DefaultPaletteOptions;
  }
  interface PaletteOptions {
    pageBackground?: {
      main: string;
      dark: string;
      light: string;
    };
  }
}

const commonPalette: PaletteOptions = {
  primary: {
    main: "#cf4d4f",
    light: "#ff7e7b",
    dark: "#981727",
  },
  secondary: {
    main: "#2b0000",
    light: "#55292c",
    dark: "#0d0000",
  },
  error: {
    main: red.A400,
  },
};

export const lightTheme = createTheme({
  palette: {
    ...commonPalette,
    mode: "light",
    pageBackground: {
      main: grey[300],
      dark: grey[400],
      light: grey[200],
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
  },
});

export const darkTheme = createTheme({
  palette: {
    ...commonPalette,
    mode: "dark",
    pageBackground: {
      main: grey[800],
      dark: grey[900],
      light: grey[600],
    },
    background: {
      // paper: grey[900],
      // default: grey[900]
    },
  },
  typography: {
    // fontFamily: roboto.style.fontFamily,
  },
});

export const NAME_THEME_MAP = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeType = keyof typeof NAME_THEME_MAP;

export const THEME_NAME_MAP = new Map<Theme, ThemeType>();
THEME_NAME_MAP.set(lightTheme, "light");
THEME_NAME_MAP.set(darkTheme, "dark");
