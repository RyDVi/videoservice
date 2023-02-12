import { Category } from "@modules/api";
import { ListItemText } from "@mui/material";
import React from "react";
import { MultiSelecForm, MultiSelectData } from "./MultiselectForm";

function renderListItemContent(item: Category) {
  return (
    <>
      <ListItemText primary={item.name} secondary={item.type} />
    </>
  );
}

export const FilmCategoriesMultiselect: React.FC<MultiSelectData<Category>> = (
  props
) => (
  <MultiSelecForm {...props} renderListItemContent={renderListItemContent} />
);
