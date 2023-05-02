import { Box } from "@mui/material";
import React from "react";

interface MainContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  className,
  children,
}) => {
  return (
    <Box
      component="main"
      className={className}
      sx={{ flex: 1, position: "relative", overflow: "auto" }}
    >
      {children}
    </Box>
  );
};
