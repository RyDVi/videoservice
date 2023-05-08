import { Genre } from "@modules/api";
import { useSaveGenre, useDeleteGenre } from "@modules/axios-hooks";
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
import { DeleteDialog } from "@modules/crm";
import React from "react";

export const GenreFormFields: React.FC<FormFields<Genre>> = ({
  data,
  onChange,
  error,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <TextField
        name="name"
        label="Наименование"
        value={data.name}
        onChange={handleChange}
        error={!!error?.name}
        helperText={error?.name}
        variant="standard"
      />
    </>
  );
};

export const ReadGenreFormFields: React.FC<ReadFormFields<Genre>> = ({
  data,
}) => {
  if (!data) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Наименование" secondary="Наименование" />
          </Skeleton>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <ListItemText primary="Наименование" secondary={data.name} />
      </ListItem>
    </>
  );
};

export const CreateEditGenreForm: React.FC<CreateEditForm<Genre>> = ({
  data,
  onSave,
  onCancel,
}) => {
  const { genre, genreError, loading, saveGenre, setGenre } =
    useSaveGenre(data);
  return (
    <CreateEditForm
      onSubmit={() => saveGenre().then((response) => onSave(response.data))}
      loading={loading}
      onCancel={onCancel}
    >
      <GenreFormFields data={genre} onChange={setGenre} error={genreError} />
    </CreateEditForm>
  );
};

export const DeleteGenreDialog: React.FC<DeleteDialogFormProps<Genre>> = ({
  onCancel,
  onDelete,
  open,
  data,
}) => {
  const { deleteGenre } = useDeleteGenre();
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteGenre(data?.id).then(
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

export const ReadEditGenreForm: React.FC<ReadEditFormProps<Genre>> = (
  props
) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditGenreForm}
    ReadFormFields={ReadGenreFormFields}
    DeleteDialog={DeleteGenreDialog}
  />
);

export const GenreInfoCard: React.FC<
  { data?: Genre; onSave?: (data: Genre) => void } & CardProps
> = ({ data, onSave, ...props }) => {
  const [title, setTitle] = useState("Информация о жанре");
  return (
    <CardForm title={title} {...props}>
      <ReadEditGenreForm
        data={data}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit ? "Редактирование информации о жанре" : "Информация о жанре"
          );
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
