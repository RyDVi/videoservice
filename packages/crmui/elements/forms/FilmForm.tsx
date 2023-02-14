import {
  CONTENT_RATINGS,
  Film,
  useDeleteFilm,
  useSaveFilm,
} from "@modules/api";
import { useHandleChange } from "@modules/hooks";
import {
  Box,
  Button,
  CardProps,
  ImageListItem,
  ListItem,
  ListItemText,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
  useTheme,
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

const FileInput: React.FC<
  {
    onChange: (srcImage: string) => void;
    children: (props: { toUpload: () => void }) => React.ReactNode;
  } & Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "children" | "src"
  >
> = ({ onChange, children, ...props }) => {
  const handleFileChange = React.useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      const newFile = files && files.length ? files[0] : null;
      if (newFile) {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () =>
          onChange(String(fileReader.result))
        );
        fileReader.readAsDataURL(newFile);
      }
    },
    [onChange]
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const toUpload = React.useCallback(() => {
    inputRef.current?.click();
  }, []);
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleFileChange}
        {...props}
      />
      {children({ toUpload })}
    </>
  );
};

export const FilmFormFields: React.FC<FormFields<Film>> = ({
  data: film,
  onChange,
  error,
}) => {
  const handleChange = useHandleChange(onChange, film);
  const theme = useTheme();
  return (
    <>
      <TextField
        name="name"
        label="Наименование"
        value={film.name}
        onChange={handleChange}
        error={!!error?.name}
        helperText={error?.name}
        variant="standard"
      />
      <TextField
        name="original_name"
        label="Наименование в оригинале"
        value={film.original_name}
        onChange={handleChange}
        error={!!error?.original_name}
        helperText={error?.original_name}
        variant="standard"
      />
      <TextField
        name="description_short"
        label="Краткое описание"
        value={film.description_short}
        onChange={handleChange}
        error={!!error?.description_short}
        helperText={error?.description_short}
        variant="standard"
        multiline
        rows={5}
      />
      <TextField
        name="description_full"
        label="Полное описание"
        value={film.description_full}
        onChange={handleChange}
        error={!!error?.description_full}
        helperText={error?.description_full}
        variant="standard"
        multiline
        rows={10}
      />
      <TextField
        name="country"
        label="Страна"
        value={film.country}
        onChange={handleChange}
        error={!!error?.country}
        helperText={error?.country}
        variant="standard"
      />
      <TextField
        name="content_rating"
        label="Рейтинг контента"
        value={String(film.content_rating)}
        onChange={handleChange}
        error={!!error?.content_rating}
        helperText={error?.content_rating}
        variant="standard"
        select
      >
        {Object.entries(CONTENT_RATINGS).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <FileInput onChange={(image) => onChange({ ...film, image })}>
        {({ toUpload }) => (
          <Box>
            <Button onClick={toUpload}>Загрузить изображение</Button>
            {film.image && (
              <Image
                src={film.image}
                alt="Постер для фильма"
                width={400}
                height={600}
              />
            )}
            {error?.image && (
              <Typography color={theme.palette.error?.main} sx={{ p: 1, pt: 0 }}>
                {error?.image}
              </Typography>
            )}
          </Box>
        )}
      </FileInput>
    </>
  );
};

export const ReadFilmFormFields: React.FC<ReadFormFields<Film>> = ({
  data: film,
}) => {
  if (!film) {
    return (
      <>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Наименование" secondary="Наименование" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText
              primary="Наименование в оригинале"
              secondary="Наименование в оригинале"
            />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText
              primary="Краткое описание"
              secondary="Краткое описание"
            />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText
              primary="Полное описание"
              secondary="Полное описание"
            />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Страна" secondary="Страна" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText primary="Постер" secondary="Постер" />
          </Skeleton>
        </ListItem>
        <ListItem>
          <Skeleton>
            <ListItemText
              primary="Рейтинг контента"
              secondary="Рейтинг контента"
            />
          </Skeleton>
        </ListItem>
      </>
    );
  }
  return (
    <>
      <ListItem>
        <ListItemText primary="Наименование" secondary={film.name} />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Наименование в оригинале"
          secondary={film.original_name}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Краткое описание"
          secondary={film.description_short}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Полное описание"
          secondary={film.description_full}
        />
      </ListItem>
      <ListItem>
        <ListItemText primary="Страна" secondary={film.country} />
      </ListItem>
      <ListItem>
        <ListItemText primary="Постер к фильму" secondary={film.image} />
      </ListItem>
      <ImageListItem sx={{ display: "flex", justifyContent: "center" }}>
        {film.image && (
          <Image
            src={film.image}
            alt="Постер к фильму"
            width={200}
            height={300}
          />
        )}
      </ImageListItem>
      <ListItem>
        <ListItemText
          primary="Рейтинг контента"
          secondary={CONTENT_RATINGS[film.content_rating]}
        />
      </ListItem>
    </>
  );
};

export const CreateEditFilmForm: React.FC<CreateEditForm<Film>> = ({
  data: initialFilm,
  onSave,
  onCancel,
}) => {
  const { film, setFilm, filmError, saveFilm, loading } =
    useSaveFilm(initialFilm);
  return (
    <CreateEditForm
      onSubmit={() => saveFilm().then((response) => onSave(response.data))}
      loading={loading}
      onCancel={onCancel}
    >
      <FilmFormFields data={film} onChange={setFilm} error={filmError} />
    </CreateEditForm>
  );
};

export const DeleteFilmDialog: React.FC<DeleteDialogFormProps<Film>> = ({
  onCancel,
  onDelete,
  open,
  data,
}) => {
  const { deleteFilm } = useDeleteFilm(data?.id);
  if (!data) {
    return null;
  }
  return (
    <DeleteDialog
      open={open}
      onCancel={onCancel}
      onDelete={() => {
        return deleteFilm().then(
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

export const ReadEditFilmForm: React.FC<ReadEditFormProps<Film>> = (props) => (
  <ReadEditForm
    {...props}
    CreateEditForm={CreateEditFilmForm}
    ReadFormFields={ReadFilmFormFields}
    DeleteDialog={DeleteFilmDialog}
  />
);

export const FilmInfoCard: React.FC<
  { film?: Film; onSave?: (film: Film) => void } & CardProps
> = ({ film, onSave, ...props }) => {
  const [title, setTitle] = useState("Информация о фильме");
  return (
    <CardForm title={title} {...props}>
      <ReadEditFilmForm
        data={film}
        onStateChange={(isEdit) => {
          setTitle(
            isEdit
              ? "Редактирование информации о фильме"
              : "Информация о фильме"
          );
        }}
        onSave={onSave}
      />
    </CardForm>
  );
};
