import { useUploadSubtitleFile, SubtitleFile } from '@modules/api';
import { useIsValueChanged } from '@modules/hooks';
import { Stack } from '@mui/material';
import React from 'react';
import { createRef, useEffect } from 'react';
import { FileInputUploader, FileInputUploaderProps } from './FileInput';

const SubtitlePreview: React.FC<
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    subtitleFile?: File | null;
    value?: string;
  }
> = ({ subtitleFile, value, ...props }) => {
  const subtitlePlayerRef = createRef<HTMLVideoElement>();
  const isFileChanged = useIsValueChanged(subtitleFile?.name);
  const isValueChanged = useIsValueChanged(value);
  useEffect(() => {
    if (!isFileChanged() && !isValueChanged()) {
      return;
    }
    if (!subtitleFile || !subtitlePlayerRef.current) {
      if (!subtitlePlayerRef.current) {
        return;
      }
      if (value && subtitlePlayerRef.current.src !== value) {
        subtitlePlayerRef.current.src = value;
        return;
      }
      subtitlePlayerRef.current.src = '';
      return;
    }
    subtitleFile.arrayBuffer().then((buffer) => {
      if (!subtitlePlayerRef.current) {
        return;
      }
      const blob = new Blob([buffer]);
      const blobUrl = URL.createObjectURL(blob);
      subtitlePlayerRef.current.src = blobUrl;
    });
  }, [isFileChanged, isValueChanged, value, subtitleFile, subtitlePlayerRef]);
  return (
    <video ref={subtitlePlayerRef} controls preload="metadata" {...props}>
      <track kind="subtitles" src={value} srcLang="en" label="English"></track>
    </video>
  );
};

const SubtitleUploader: React.FC<
  Omit<
    FileInputUploaderProps,
    'onChange' | 'onUpload' | 'file' | 'value' | 'onValueChange' | 'onDelete'
  > & {
    subtitleFile: SubtitleFile;
  }
> = ({ subtitleFile: initialSubtitleFile, ...props }) => {
  const {
    setSubtitleFile,
    upload,
    uploadProgress,
    subtitleFile,
    isUploadingSubtitleFile,
    src,
    deleteFileOfSubtitle,
  } = useUploadSubtitleFile(initialSubtitleFile);
  return (
    <Stack direction="column" spacing={2}>
      <SubtitlePreview subtitleFile={subtitleFile} value={src} />
      <FileInputUploader
        onChange={setSubtitleFile}
        value={src}
        file={subtitleFile}
        onUpload={upload}
        uploadProgress={uploadProgress?.progress}
        onDelete={deleteFileOfSubtitle}
        accept=".mp3,.ogg"
        disabled={isUploadingSubtitleFile}
        {...props}
      />
    </Stack>
  );
};

export default SubtitleUploader;
