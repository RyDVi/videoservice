import { Genre } from "@modules/api";
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";
import React from "react";

interface GenreListItemProps extends ListItemButtonProps {
  genre: Genre;
}

export const GenreListItem: React.FC<GenreListItemProps> = ({
  genre,
  ...props
}) => {
  const { name } = genre;
  return (
    <ListItemButton {...props}>
      <ListItemText primary={name} />
    </ListItemButton>
  );
};
