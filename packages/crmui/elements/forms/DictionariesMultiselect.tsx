import { Dictionary } from "@modules/api";
import { useBoolean } from "@modules/hooks";
import { ListItemText } from "@mui/material";
import React from "react";
import {
  MultiSelecForm,
  MultiSelectData,
  MultiselectModal,
  MultiSelectModalData,
} from "./MultiselectForm";

function renderListItemContent(item: Dictionary) {
  return (
    <>
      <ListItemText primary={item.name} />
    </>
  );
}

export const DictionariesMultiselect: React.FC<
  MultiSelectData<Dictionary> & MultiSelectModalData<Dictionary>
> = ({ data, onDelete, possibleValues, onAdd }) => {
  const [isOpenModal, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);
  return (
    <>
      <MultiSelecForm
        renderListItemContent={renderListItemContent}
        data={data}
        onDelete={onDelete}
        onAdd={openModal}
        withAccept
      />
      <MultiselectModal
        isOpen={isOpenModal}
        renderListItemContent={renderListItemContent}
        possibleValues={possibleValues}
        filterSearch={(search, data) =>
          data.filter((d) =>
            d.name.toLowerCase().includes(search.toLowerCase())
          )
        }
        onClose={closeModal}
        onAdd={onAdd}
      />
    </>
  );
};
