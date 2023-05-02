import { Paper } from "@mui/material";
import React from "react";

export const Sidebar: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Paper elevation={3} sx={{ height: "100%" }}>
    {children}
  </Paper>
);
