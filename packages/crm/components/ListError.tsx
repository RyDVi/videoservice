import { Alert, List, ListItem, ListItemText } from "@mui/material";
import React from "react";

export const ListError: React.FC<{ error?: string[] }> = ({ error }) => (
  <List>
    {error?.map((errText, index) => (
      <ListItem key={index}>
        <ListItemText primary={<Alert severity="error">{errText}</Alert>} />
      </ListItem>
    ))}
  </List>
);
