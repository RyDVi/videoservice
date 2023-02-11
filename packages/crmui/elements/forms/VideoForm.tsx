import { useDeleteVideo, useSaveVideo, Video, VIDEO_TYPES } from '@modules/api';
import { useHandleChange } from '@modules/hooks';
import {
  CardProps,
  ListItem,
  ListItemText,
  MenuItem,
  Skeleton,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import DeleteDialog from '../dialogs/DeleteDialog';
import {
  CreateEditForm,
  FormFields,
  ReadFormFields,
  ReadEditFormProps,
  ReadEditForm,
  CardForm,
  DeleteDialogFormProps,
} from './Form';

export const VideoFields: React.FC<FormFields<Video>> = ({ data, onChange, error }) => {
  const handleChange = useHandleChange(onChange, data);
  return (
    <>
      <TextField
        name="type"
        label="Тип фильма"
        value={String(data.type)}
        onChange={handleChange}
        error={!!error?.type}
        helperText={error?.type}
        variant="standard"
        select
      >
        {Object.entries(VIDEO_TYPES).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        name="season"
        type="number"
        label="Сезон"
        value={data.season}
        onChange={handleChange}
        error={!!error?.season}
        helperText={error?.season}
      />
      <TextField
        name="series"
        type="number"
        label="Серия"
        value={data.series}
        onChange={handleChange}
        error={!!error?.series}
        helperText={error?.series}
      />
    </>
  );
};

export const CreateEditVideoForm: React.FC<CreateEditForm<Video>> = ({
  data: initialVideo,
  onSave,
  onCancel,
}) => {
  const { video, setVideo, errorOfSaveVideo, isSaveVideoLoading, saveVideo } =
    useSaveVideo(initialVideo);
  return (
    <CreateEditForm
      onSubmit={() => saveVideo().then((response) => onSave(response.data))}
      loading={isSaveVideoLoading}
      onCancel={onCancel}
    >
      <VideoFields data={video} onChange={setVideo} error={errorOfSaveVideo} />
    </CreateEditForm>
  );
};

export const ReadVideoFields: React.FC<ReadFormFields<Video>> = ({ data: video }) => {
  if (!video) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Тип видео" secondary="Тип видео" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Сезон" secondary="Сезон" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Серия" secondary="Серия" />
          </Skeleton>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <ListItemText primary="Тип видео" secondary={VIDEO_TYPES[video.type]} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Сезон" secondary={video.season} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Серия" secondary={video.series} />
      </ListItem>
    </>
  );
};

export const DeleteVideoDialog: React.FC<DeleteDialogFormProps<Video>> = ({
  onCancel,
  onDelete,
  open,
  data,
}) => {
  const { deleteVideo } = useDeleteVideo(data?.id);
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteVideo().then(
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

export const ReadEditVideoForm: React.FC<ReadEditFormProps<Video>> = (props) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditVideoForm}
    ReadFormFields={ReadVideoFields}
    DeleteDialog={DeleteVideoDialog}
  />
);

export const VideoInfoCard: React.FC<
  { data?: Video; onSave?: (data: Video) => void } & CardProps
> = ({ data, onSave, ...props }) => {
  const [title, setTitle] = useState('Информация о видео');
  return (
    <CardForm title={title} {...props}>
      <ReadEditVideoForm
        data={data}
        onStateChange={(isEdit) => {
          setTitle(isEdit ? 'Редактирование информации о видео' : 'Информация о видео');
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
