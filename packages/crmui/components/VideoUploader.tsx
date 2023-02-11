import { useUploadVideoFile, VideoFile } from '@modules/api';
import { useIsValueChanged } from '@modules/hooks';
import { Stack } from '@mui/material';
import React from 'react';
import { createRef, useEffect, useState } from 'react';
import { FileInputUploader, FileInputUploaderProps } from './FileInput';

const VideoPreview: React.FC<
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    videoFile?: File | null;
    value?: string;
  }
> = ({ videoFile, value, ...props }) => {
  const videoPlayerRef = createRef<HTMLVideoElement>();
  const isFileChanged = useIsValueChanged(videoFile?.name);
  const isValueChanged = useIsValueChanged(value);
  useEffect(() => {
    if (!isFileChanged() && !isValueChanged()) {
      return;
    }
    if (!videoFile || !videoPlayerRef.current) {
      if (!videoPlayerRef.current) {
        return;
      }
      if (value && videoPlayerRef.current.src !== value) {
        videoPlayerRef.current.src = value;
        return;
      }
      videoPlayerRef.current.src = '';
      return;
    }
    videoFile.arrayBuffer().then((buffer) => {
      if (!videoPlayerRef.current) {
        return;
      }
      const blob = new Blob([buffer]);
      const blobUrl = URL.createObjectURL(blob);
      videoPlayerRef.current.src = blobUrl;
    });
  }, [isFileChanged, isValueChanged, value, videoFile, videoPlayerRef]);
  return (
    <video
      ref={videoPlayerRef}
      controls
      width="360"
      //   poster="placeholder.png"
      preload="metadata"
      {...props}
    >
      <source src={value} type="video/mp4" />
    </video>
  );
};

export const VideoUploader: React.FC<
  Omit<
    FileInputUploaderProps,
    'onChange' | 'onUpload' | 'file' | 'value' | 'onValueChange' | 'onDelete'
  > & {
    videoFile: VideoFile;
  }
> = ({ videoFile: initialVideoFile, ...props }) => {
  const {
    setVideoFile,
    upload,
    uploadProgress,
    videoFile,
    isUploadingVideoFile,
    src,
    deleteFileOfVideo,
  } = useUploadVideoFile(initialVideoFile);
  return (
    <Stack direction="column" spacing={2}>
      <VideoPreview videoFile={videoFile} value={src} />
      <FileInputUploader
        onChange={setVideoFile}
        value={src}
        file={videoFile}
        onUpload={upload}
        uploadProgress={uploadProgress?.progress}
        onDelete={deleteFileOfVideo}
        accept=".mp4,.webm,.m3u8"
        disabled={isUploadingVideoFile}
        {...props}
      />
      {(uploadProgress?.progress || 0) >= 1 &&
        isUploadingVideoFile &&
        'Сохранение в хранилище'}
    </Stack>
  );
};