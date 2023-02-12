import {
  Category,
  CategoryTypeOptions,
  CONTENT_RATINGS,
  Film,
  useDeleteFilm,
  useSaveFilm,
} from "@modules/api";
import { useHandleChange } from "@modules/hooks";
import {
  CardProps,
  ImageListItem,
  ListItem,
  ListItemText,
  MenuItem,
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
import Image from "next/image";
import {
  useSaveCategory,
  useDeleteCategory,
} from "../../../api/categories/hooks";

export const CategoryFormFields: React.FC<FormFields<Category>> = ({
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
      <TextField
        name="type"
        label="Тип категории"
        value={data.type}
        onChange={handleChange}
        error={!!error?.type}
        helperText={error?.type}
        variant="standard"
        select
      >
        {CategoryTypeOptions.map(({ name, value }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export const ReadCategoryFormFields: React.FC<ReadFormFields<Category>> = ({
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
        <ListItem>
          <Skeleton>
            <ListItemText primary="Тип" secondary="Тип" />
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
      <ListItem>
        <ListItemText primary="Тип" secondary={data.type} />
      </ListItem>
    </>
  );
};

export const CreateEditCategoryForm: React.FC<CreateEditForm<Category>> = ({
  data,
  onSave,
  onCancel,
}) => {
  const { category, categoryError, loading, saveCategory, setCategory } =
    useSaveCategory(data);
  return (
    <CreateEditForm
      onSubmit={() => saveCategory().then((response) => onSave(response.data))}
      loading={loading}
      onCancel={onCancel}
    >
      <CategoryFormFields
        data={category}
        onChange={setCategory}
        error={categoryError}
      />
    </CreateEditForm>
  );
};

export const DeleteCategoryDialog: React.FC<
  DeleteDialogFormProps<Category>
> = ({ onCancel, onDelete, open, data }) => {
  const { deleteCategory } = useDeleteCategory(data?.id);
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteCategory().then(
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

export const ReadEditCategoryForm: React.FC<ReadEditFormProps<Category>> = (
  props
) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditCategoryForm}
    ReadFormFields={ReadCategoryFormFields}
    DeleteDialog={DeleteCategoryDialog}
  />
);

export const CategoryInfoCard: React.FC<
  { data?: Category; onSave?: (data: Category) => void } & CardProps
> = ({ data, onSave, ...props }) => {
  const [title, setTitle] = useState("Информация о категории");
  return (
    <CardForm title={title} {...props}>
      <ReadEditCategoryForm
        data={data}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit
              ? "Редактирование информации о категории"
              : "Информация о категории"
          );
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
