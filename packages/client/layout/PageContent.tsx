import { Box, Paper, PaperProps } from "@mui/material";
import React from "react";

interface ContentContainerProps extends PaperProps {}

export const PageContent: React.FC<ContentContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper sx={{ overflowY: "auto", padding: 3 }} elevation={2} {...props}>
      {children}
    </Paper>
  );
};
