import { Category, Dictionary } from "@modules/api";
import { ListItemText } from "@mui/material";
import React from "react";
import { MultiSelecForm, MultiSelectData } from "./MultiselectForm";

function renderListItemContent(item: Dictionary) {
  return (
    <>
      <ListItemText primary={item.name} />
    </>
  );
}

export const DictionariesMultiselect: React.FC<MultiSelectData<Dictionary>> = (
  props
) => (
  <MultiSelecForm
    {...props}
    renderListItemContent={renderListItemContent}
    filterSearch={(search, data) =>
      data.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
    }
    withAccept
  />
);
