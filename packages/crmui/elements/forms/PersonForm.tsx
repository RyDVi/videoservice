import { Person, useSavePerson, useDeletePerson } from "@modules/api";
import { useHandleChange } from "@modules/hooks";
import {
  CardProps,
  ListItem,
  ListItemText,
  Skeleton,
  TextField,
} from "@mui/material";
import {
  CardForm,
  CreateEditForm,
  DeleteDialogFormProps,
  FormFields,
  ReadEditForm,
  ReadEditFormProps,
  ReadFormFields,
} from "./Form";
import { useState } from "react";
import { DeleteDialog } from "../dialogs";
import React from "react";

export const PersonFormFields: React.FC<FormFields<Person>> = ({
  data,
  onChange,
  error,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <TextField
        name="firstname"
        label="Имя"
        value={data.firstname}
        onChange={handleChange}
        error={!!error?.firstname}
        helperText={error?.firstname}
        variant="standard"
      />
      <TextField
        name="lastname"
        label="Фамилия"
        value={data.lastname}
        onChange={handleChange}
        error={!!error?.lastname}
        helperText={error?.lastname}
        variant="standard"
      />
    </>
  );
};

export const ReadPersonFormFields: React.FC<ReadFormFields<Person>> = ({
  data,
}) => {
  if (!data) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Имя" secondary="Имя" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Фамилия" secondary="Фамилия" />
          </Skeleton>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <ListItemText primary="Имя" secondary={data.firstname} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Фамилия" secondary={data.lastname} />
      </ListItem>
    </>
  );
};

export const CreateEditPersonForm: React.FC<CreateEditForm<Person>> = ({
  data,
  onSave,
  onCancel,
}) => {
  const { isLoadingSavePerson, person, personError, savePerson, setPerson } =
    useSavePerson(data);
  return (
    <CreateEditForm
      onSubmit={() => savePerson().then((response) => onSave(response.data))}
      loading={isLoadingSavePerson}
      onCancel={onCancel}
    >
      <PersonFormFields
        data={person}
        onChange={setPerson}
        error={personError}
      />
    </CreateEditForm>
  );
};

export const DeletePersonDialog: React.FC<DeleteDialogFormProps<Person>> = ({
  onCancel,
  onDelete,
  open,
  data,
}) => {
  const { deletePerson } = useDeletePerson();
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deletePerson(data?.id).then(
          () => {
            onDelete(data);
            return true;
          },
          () => false
        );
      }}
    />
  );
};

export const ReadEditPersonForm: React.FC<ReadEditFormProps<Person>> = (
  props
) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditPersonForm}
    ReadFormFields={ReadPersonFormFields}
    DeleteDialog={DeletePersonDialog}
  />
);

export const PersonInfoCard: React.FC<
  { data?: Person; onSave?: (data: Person) => void } & CardProps
> = ({ data, onSave, ...props }) => {
  const [title, setTitle] = useState("Информация о персоне");
  return (
    <CardForm title={title} {...props}>
      <ReadEditPersonForm
        data={data}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit ? "Редактирование информации о персоне" : "Информация о персоне"
          );
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
