import { Roboto } from "@next/font/google";
import { createTheme, PaletteOptions } from "@mui/material/styles";
import { red, blueGrey, grey } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

declare module "@mui/material/styles" {
  interface Theme {
    palette: PaletteOptions;
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
    fontFamily: roboto.style.fontFamily,
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
    background:{
      // paper: grey[900],
      // default: grey[900]
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
