import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

interface MediaScreen {
  children: React.ReactNode;
}

export const DownMobileScreen: React.FC<MediaScreen> = ({ children }) => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.down("sm"));
  if (!matched) {
    ``;
    return null;
  }
  return <>{children}</>;
};

export const DownTabletScreen: React.FC<MediaScreen> = ({ children }) => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.down("md"));
  if (!matched) {
    return null;
  }
  return <>{children}</>;
};

export const UpTabletScreen: React.FC<MediaScreen> = ({ children }) => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.up("md"));
  if (!matched) {
    return null;
  }
  return <>{children}</>;
};

export const DownLaptopScreen: React.FC<MediaScreen> = ({ children }) => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.down("lg"));
  if (!matched) {
    return null;
  }
  return <>{children}</>;
};

export const DownLaptopLargeScreen: React.FC<MediaScreen> = ({ children }) => {
  const theme = useTheme();
  const matched = useMediaQuery(theme.breakpoints.down("xl"));
  if (!matched) {
    return null;
  }
  return <>{children}</>;
};
