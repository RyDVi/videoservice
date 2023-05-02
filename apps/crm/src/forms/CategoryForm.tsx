import { Category } from "@modules/api";
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
import { useSaveCategory, useDeleteCategory } from "@modules/request-hooks";

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
  const { deleteCategory } = useDeleteCategory();
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteCategory(data?.id).then(
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
