import React from "react";
import { ShellBar } from "./ShellBar";
import { SidebarContainer } from "./SidebarContainer";
import { MainContainer } from "./MainContainer";
import { Box, Stack } from "@mui/material";

export const CRMContainer: React.FC<{
  children?: React.ReactNode;
  sidebarContent?: React.ReactNode;
}> = ({ children, sidebarContent }) => {
  return (
    <Stack sx={{ height: "100vh", width: "100vw" }} direction="row">
      <SidebarContainer>{sidebarContent}</SidebarContainer>
      <MainContainer>
        <ShellBar />
        <Box sx={{ padding: 2 }}>
          {children}
          {/* TODO: Only for test scrolling. Delete it */}
          {/* <div sx={{ height: '300vh' }}>Test scrolling</div> */}
        </Box>
      </MainContainer>
    </Stack>
  );
};
