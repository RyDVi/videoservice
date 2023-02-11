import { Box } from "@mui/material";
import { DownTabletScreen, UpTabletScreen } from "../components";
import React from "react";
import { useTheme } from "@emotion/react";
import { MenuSidebar } from "./MenuSidebar";

interface AppProps {
  logo?: React.ReactElement;
  actions?: React.ReactElement;
  search?: React.ReactElement;
  sidebarContent?: React.ReactNode;
}

export const PageHeader: React.FC<AppProps> = ({
  logo,
  search,
  actions,
  sidebarContent,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.pageBackground?.main,
        boxShadow: "0 1px 5px 0 rgb(0 0 0 / 15%)",
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
      {...props}
    >
      <Box sx={{ height: 70 }}>{logo}</Box>
      <UpTabletScreen>
        <Box sx={{ display: "flex", alignItems: "center" }}>{actions}</Box>
        <Box sx={{ marginLeft: "auto" }}>{search}</Box>
      </UpTabletScreen>
      <DownTabletScreen>
        <Box sx={{ marginLeft: "auto" }}>
          <MenuSidebar>{sidebarContent}</MenuSidebar>
        </Box>
      </DownTabletScreen>
    </Box>
  );
};
