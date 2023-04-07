import { Paper } from "@mui/material";
import React from "react";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Paper elevation={3} sx={{ height: "100%" }}>
    {children}
  </Paper>
);

export default Sidebar;
