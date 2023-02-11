import { useDeleteSubtitleFile, useSaveSubtitleFile, SubtitleFile } from '@modules/api';
import { useHandleChange } from '@modules/hooks';
import {
  CardProps,
  ListItem,
  ListItemText,
  Paper,
  Skeleton,
  TextField,
} from '@mui/material';
import {
  CardForm,
  CreateEditForm,
  DeleteDialogFormProps,
  FormFields,
  ReadEditForm,
  ReadEditFormProps,
  ReadFormFields,
} from '../Form';
import { useState } from 'react';
import DeleteDialog from '../../dialogs/DeleteDialog';
import SubtitleUploader from 'crmui/components/SubtitleUploader';
import React from 'react';

export const SubtitleFileFormFields: React.FC<FormFields<SubtitleFile>> = ({
  data,
  onChange,
  error,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <TextField
        name="studio_name"
        label="Студия перевода"
        value={data.studio_name}
        onChange={handleChange}
        error={!!error?.studio_name}
        helperText={error?.studio_name}
        variant="standard"
      />
    </>
  );
};

export const ReadSubtitleFileFormFields: React.FC<ReadFormFields<SubtitleFile>> = ({
  data,
}) => {
  if (!data) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Студия перевода" secondary="Студия перевода" />
          </Skeleton>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <Paper sx={{ p: 1 }} elevation={2}>
          <SubtitleUploader subtitleFile={data} />
        </Paper>
      </ListItem>
      <ListItem>
        <ListItemText primary="Студия перевода" secondary={data.studio_name} />
      </ListItem>
    </>
  );
};

export const CreateEditSubtitleFileForm: React.FC<CreateEditForm<SubtitleFile>> = ({
  data: initialData,
  onSave,
  onCancel,
}) => {
  const {
    errorOfSaveSubtitleFile,
    isSaveSubtitleFile,
    saveSubtitleFile,
    setSubtitleFile,
    subtitleFile,
  } = useSaveSubtitleFile(initialData);
  return (
    <CreateEditForm
      onSubmit={() => saveSubtitleFile().then((response) => onSave(response.data))}
      loading={isSaveSubtitleFile}
      onCancel={onCancel}
    >
      <SubtitleFileFormFields
        data={subtitleFile}
        onChange={setSubtitleFile}
        error={errorOfSaveSubtitleFile}
      />
    </CreateEditForm>
  );
};

export const DeleteSubtitleFileDialog: React.FC<DeleteDialogFormProps<SubtitleFile>> = ({
  onCancel,
  onDelete,
  open,
  data,
}) => {
  const { deleteSubtitleFile } = useDeleteSubtitleFile(data?.id);
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteSubtitleFile().then(
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

export const ReadEditSubtitleFileForm: React.FC<ReadEditFormProps<SubtitleFile>> = (props) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditSubtitleFileForm}
    ReadFormFields={ReadSubtitleFileFormFields}
    DeleteDialog={DeleteSubtitleFileDialog}
  />
);

export const SubtitleFileInfoCard: React.FC<
  {
    subtitleFile?: SubtitleFile;
    onSave?: (SubtitleFile: SubtitleFile) => void;
    onDelete?: (data: SubtitleFile) => void;
  } & CardProps
> = ({ subtitleFile, onSave, onDelete, ...props }) => {
  const [title, setTitle] = useState('Информация о субтитрах');
  return (
    <CardForm title={title} {...props}>
      <ReadEditSubtitleFileForm
        data={subtitleFile}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit ? 'Редактирование информации о субтитрах' : 'Информация о субтитрах'
          );
        }}
        onSave={onSave}
        onDelete={onDelete}
      />
    </CardForm>
  );
};
