import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardProps,
  List,
} from '@mui/material';
import { useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { ValidationErrors } from '@modules/api';
import React from 'react';

export const SubmitButton: React.FC<ButtonProps> = (props) => (
  <Button type="submit" startIcon={<SaveIcon />} color="success" {...props}>
    Сохранить
  </Button>
);

export const EditButton: React.FC<ButtonProps> = (props) => (
  <Button startIcon={<EditIcon />} {...props}>
    Редактировать
  </Button>
);

export const CancelButton: React.FC<ButtonProps> = (props) => (
  <Button startIcon={<CancelIcon />} color="inherit" {...props}>
    Отменить
  </Button>
);

export const DeleteButton: React.FC<ButtonProps> = (props) => (
  <Button startIcon={<DeleteIcon />} color="error" {...props}>
    Удалить
  </Button>
);

interface CreateEditFormProps {
  onSubmit: (event: React.FormEvent) => void;
  loading?: boolean;
  children: React.ReactNode;
  onCancel: () => void;
}
export function CreateEditForm({
  children,
  onCancel,
  onSubmit,
  loading,
}: CreateEditFormProps) {
  return (
    <Box
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}
      sx={{ '& .MuiTextField-root': { m: 1 } }}
      display="flex"
      flexDirection="column"
    >
      {children}
      <CardActions>
        <SubmitButton disabled={loading} />
        <CancelButton onClick={onCancel} />
      </CardActions>
    </Box>
  );
}

interface CardFormProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

export function CardForm({ title, children, ...props }: CardFormProps & CardProps) {
  return (
    <Card {...props}>
      <CardHeader title={title} />
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface ReadFormProps {
  onEdit?: () => void;
  onDelete?: () => void;
  children: React.ReactNode;
}

export function ReadForm({ children, onEdit, onDelete }: ReadFormProps) {
  return (
    <Box>
      <List>{children}</List>
      <CardActions>
        {onEdit && <EditButton onClick={onEdit} />}
        {onDelete && <DeleteButton onClick={onDelete} />}
      </CardActions>
    </Box>
  );
}

export interface CreateEditForm<D> {
  data?: D;
  onSave: (data: D) => void;
  onCancel: () => void;
}

export interface ReadFormFields<D> {
  data?: D;
}

export interface ReadEditFormProps<D> {
  data?: D;
  onSave?: (data: D) => void;
  onStateChange?: (isEdit: boolean) => void;
  onDelete?: (data: D) => void;
}

export interface DeleteDialogFormProps<D> {
  open: boolean;
  data?: D;
  onDelete: (data: D) => void;
  onCancel: () => void;
}

export function ReadEditForm<D>({
  data,
  onSave,
  onStateChange,
  CreateEditForm,
  ReadFormFields,
  DeleteDialog,
  onDelete,
}: ReadEditFormProps<D> & {
  CreateEditForm: React.FC<CreateEditForm<D>>;
  ReadFormFields: React.FC<ReadFormFields<D>>;
  DeleteDialog: React.FC<DeleteDialogFormProps<D>>;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleChangeState = useCallback(
    (state: boolean) => {
      setIsEdit(state);
      onStateChange && onStateChange(state);
    },
    [onStateChange]
  );
  if (isEdit && onSave) {
    return (
      <CreateEditForm
        data={data}
        onSave={(data) => {
          onSave(data);
          handleChangeState(false);
        }}
        onCancel={() => {
          handleChangeState(false);
        }}
      />
    );
  }
  return (
    <ReadForm
      onEdit={onSave ? () => handleChangeState(true) : undefined}
      onDelete={onDelete ? () => setIsOpenDelete(true) : undefined}
    >
      <ReadFormFields data={data} />
      <DeleteDialog
        data={data}
        open={isOpenDelete}
        onDelete={(data) => {
          onDelete && onDelete(data);
          setIsOpenDelete(false);
        }}
        onCancel={() => setIsOpenDelete(false)}
      />
    </ReadForm>
  );
}

export interface FormFields<T> {
  data: T;
  onChange: (data: T) => void;
  error?: ValidationErrors<T> | null;
}
