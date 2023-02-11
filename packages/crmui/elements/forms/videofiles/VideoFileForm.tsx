import { useDeleteVideoFile, useSaveVideoFile, VideoFile } from "@modules/api";
import { useHandleChange } from "@modules/hooks";
import {
  CardProps,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
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
} from "../Form";
import { useState } from "react";
import { RESOLUTIONS } from "./constants";
import { DeleteDialog } from "../../dialogs";
import { VideoUploader } from "../../../components";
import React from "react";

export const VideoFileFormFields: React.FC<FormFields<VideoFile>> = ({
  data,
  onChange,
  error,
}) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <TextField
        name="resolution"
        label="Качество видео"
        value={data.resolution}
        onChange={handleChange}
        error={!!error?.resolution}
        helperText={error?.resolution}
        variant="standard"
        select
      >
        {Object.entries(RESOLUTIONS).map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {key} {value}p
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="sound_studio"
        label="Студия озвучки"
        value={data.sound_studio}
        onChange={handleChange}
        error={!!error?.sound_studio}
        helperText={error?.sound_studio}
        variant="standard"
      />
    </>
  );
};

export const ReadVideoFileFormFields: React.FC<ReadFormFields<VideoFile>> = ({
  data,
}) => {
  if (!data) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Качество видео" secondary="Качество видео" />
          </Skeleton>
          <ListItem>
            <ListItemText primary="Студия озвучки" secondary="Студия озвучки" />
          </ListItem>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <Paper sx={{ p: 1 }} elevation={2}>
          <VideoUploader videoFile={data} />
        </Paper>
      </ListItem>
      <ListItem>
        <ListItemText primary="Качество видео" secondary={data.resolution} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Студия озвучки" secondary={data.sound_studio} />
      </ListItem>
    </>
  );
};

export const CreateEditVideoFileForm: React.FC<CreateEditForm<VideoFile>> = ({
  data: initialData,
  onSave,
  onCancel,
}) => {
  const {
    errorOfSaveVideoFile,
    isSaveVideoFile,
    saveVideoFile,
    setVideoFile,
    videoFile,
  } = useSaveVideoFile(initialData);
  return (
    <CreateEditForm
      onSubmit={() => saveVideoFile().then((response) => onSave(response.data))}
      loading={isSaveVideoFile}
      onCancel={onCancel}
    >
      <VideoFileFormFields
        data={videoFile}
        onChange={setVideoFile}
        error={errorOfSaveVideoFile}
      />
    </CreateEditForm>
  );
};

export const DeleteVideoFileDialog: React.FC<
  DeleteDialogFormProps<VideoFile>
> = ({ onCancel, onDelete, open, data }) => {
  const { deleteVideoFile } = useDeleteVideoFile(data?.id);
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteVideoFile().then(
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

export const ReadEditVideoFileForm: React.FC<ReadEditFormProps<VideoFile>> = (
  props
) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditVideoFileForm}
    ReadFormFields={ReadVideoFileFormFields}
    DeleteDialog={DeleteVideoFileDialog}
  />
);

export const VideoFileInfoCard: React.FC<
  {
    videoFile?: VideoFile;
    onSave?: (videoFile: VideoFile) => void;
    onDelete?: (data: VideoFile) => void;
  } & CardProps
> = ({ videoFile, onSave, onDelete, ...props }) => {
  const [title, setTitle] = useState("Информация о видеофайле");
  return (
    <CardForm title={title} {...props}>
      <ReadEditVideoFileForm
        data={videoFile}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit
              ? "Редактирование информации о видеофайле"
              : "Информация о видеофайле"
          );
        }}
        onSave={onSave}
        onDelete={onDelete}
      />
    </CardForm>
  );
};
