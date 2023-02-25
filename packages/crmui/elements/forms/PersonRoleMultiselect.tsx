import { Person, FilmPerson, PersonRole } from "@modules/api";
import { useBoolean } from "@modules/hooks";
import { formatFullName, searchPerson } from "@modules/utils";
import { ListItemText } from "@mui/material";
import React from "react";
import {
  MultiSelecForm,
  MultiSelectData,
  MultiselectModal,
  MultiSelectModalData,
} from "./MultiselectForm";

function renderPersonListItemContent(item: Person) {
  return (
    <>
      <ListItemText primary={formatFullName(item)} />
    </>
  );
}

export const PersonRoleMultiselect: React.FC<
  MultiSelectData<FilmPerson> &
    MultiSelectModalData<Person> & { possibleRoles: PersonRole[] }
> = ({ data, onDelete, possibleValues, onAdd, possibleRoles }) => {
  const [isOpenModal, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);

  const renderListItem = React.useCallback(
    (item: FilmPerson) => {
      const role = possibleRoles.find((r) => r.id === item.role);
      const person = possibleValues.find((r) => r.id === item.person);
      return (
        <ListItemText
          primary={person && formatFullName(person)}
          secondary={role?.name}
        />
      );
    },
    [possibleRoles, possibleValues]
  );
  return (
    <>
      <MultiSelecForm
        renderListItemContent={renderListItem}
        data={data}
        onDelete={onDelete}
        onAdd={openModal}
        withAccept
      />
      <MultiselectModal
        isOpen={isOpenModal}
        renderListItemContent={renderPersonListItemContent}
        possibleValues={possibleValues}
        filterSearch={searchPerson}
        onClose={closeModal}
        onAdd={onAdd}
      />
    </>
  );
};
