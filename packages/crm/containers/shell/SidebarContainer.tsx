import { Box } from "@mui/material";
import React from "react";

interface SidebarContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SidebarContainer: React.FC<SidebarContainerProps> = ({
  children,
  className,
  ...props
}) => (
  <Box
    component="aside"
    sx={{ height: "100vh", maxWidth: 200, width: "100%" }}
    {...props}
  >
    {children}
  </Box>
);
