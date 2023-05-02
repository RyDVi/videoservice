import { PersonRole } from "@modules/api";
import { useSavePersonRole, useDeletePersonRole } from "@modules/request-hooks";
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

export const PersonRoleFormFields: React.FC<FormFields<PersonRole>> = ({
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

export const ReadPersonRoleFormFields: React.FC<ReadFormFields<PersonRole>> = ({
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

export const CreateEditPersonRoleForm: React.FC<CreateEditForm<PersonRole>> = ({
  data,
  onSave,
  onCancel,
}) => {
  const {
    personRole,
    personRoleError,
    loading,
    savePersonRole,
    setPersonRole,
  } = useSavePersonRole(data);
  return (
    <CreateEditForm
      onSubmit={() =>
        savePersonRole().then((response) => onSave(response.data))
      }
      loading={loading}
      onCancel={onCancel}
    >
      <PersonRoleFormFields
        data={personRole}
        onChange={setPersonRole}
        error={personRoleError}
      />
    </CreateEditForm>
  );
};

export const DeletePersonRoleDialog: React.FC<
  DeleteDialogFormProps<PersonRole>
> = ({ onCancel, onDelete, open, data }) => {
  const { deletePersonRole } = useDeletePersonRole();
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deletePersonRole(data?.id).then(
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

export const ReadEditPersonRoleForm: React.FC<ReadEditFormProps<PersonRole>> = (
  props
) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditPersonRoleForm}
    ReadFormFields={ReadPersonRoleFormFields}
    DeleteDialog={DeletePersonRoleDialog}
  />
);

export const PersonRoleInfoCard: React.FC<
  { data?: PersonRole; onSave?: (data: PersonRole) => void } & CardProps
> = ({ data, onSave, ...props }) => {
  const [title, setTitle] = useState("Информация о роли персоны");
  return (
    <CardForm title={title} {...props}>
      <ReadEditPersonRoleForm
        data={data}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit
              ? "Редактирование информации о роли персоны"
              : "Информация о роли персоны"
          );
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
