import { Button, ButtonProps, Stack } from '@mui/material';
import { createRef, useCallback, useState } from 'react';
import { DeleteButton } from '../elements/forms/Form';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LinearProgressNormalized } from './LinearProgressWithLabel';

export interface FileInputProps
  extends Omit<ButtonProps, 'onChange' | 'onClick' | 'component' | 'variant' | 'value'>,
    Pick<React.InputHTMLAttributes<HTMLInputElement>, 'accept'> {
  onChange: (file: File) => void;
  onDelete: () => void;
  file: File | null;
  value: string;
}

const FileInput: React.FC<FileInputProps> = ({
  onChange,
  value,
  accept,
  file,
  onDelete,
  ...props
}) => {
  const fileInputRef = createRef<HTMLInputElement>();
  if (!file && !value) {
    return (
      <Button
        component="label"
        variant="contained"
        startIcon={<FileUploadIcon />}
        {...(props as any)}
      >
        {/*TODO: Fix any */}
        Загрузить файл
        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files?.length) {
              onDelete();
              return;
            }
            onChange(event.target.files[0]);
          }}
          value={value}
          accept={accept}
        />
      </Button>
    );
  }
  return (
    <DeleteButton
      variant="contained"
      onClick={() => {
        onDelete();
        if (!fileInputRef.current) {
          return;
        }
        fileInputRef.current.value = '';
      }}
      disabled={props.disabled}
    />
  );
};

export interface FileInputUploaderProps extends FileInputProps {
  onUpload?: () => void;
  uploadProgress?: number | null;
  file: File | null;
}

export const FileInputUploader: React.FC<FileInputUploaderProps> = ({
  onChange,
  uploadProgress,
  onUpload,
  file,
  ...props
}) => (
  <Stack direction="column">
    <Stack spacing={1} direction="row">
      {file && (
        <Button
          onClick={onUpload}
          variant="contained"
          color="success"
          disabled={props.disabled}
        >
          Сохранить
        </Button>
      )}
      <FileInput onChange={onChange} file={file} {...props} accept=".mp4" {...props} />
    </Stack>
    <LinearProgressNormalized value={uploadProgress} />
  </Stack>
);

export default FileInput;
