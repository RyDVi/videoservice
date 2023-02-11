import { axiosInstance, RequestError, SaveEndpoint, useRequest } from '../base';
import { SubtitleFile } from './types';
import useSwr from 'swr';
import { useCallback, useState } from 'react';
import { AxiosProgressEvent, AxiosResponse } from 'axios';

export function useUploadSubtitleFile(initialSubtitleFile: SubtitleFile) {
  const [src, setSrc] = useState(initialSubtitleFile.file || '');
  const [errorOfUploadSubtitleFile, setError] = useState<File | null>();
  const [uploadProgress, setUploadProgress] = useState<AxiosProgressEvent | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  const upload = useCallback(() => {
    if (!subtitleFile) return {};
    const formData = new FormData();
    formData.append('file', subtitleFile);
    return axiosInstance
      .put(subtitlefilesEndpoint.uploadSubtitle(initialSubtitleFile).url, formData, {
        ...subtitlefilesEndpoint.uploadSubtitle(initialSubtitleFile),
        onUploadProgress: setUploadProgress,
      })
      .then((response) => {
        setSubtitleFile(null);
        setSrc(response.data.file);
        return response;
      })
      .catch((error: RequestError<File>) => {
        setError(error.data);
        throw error.data;
      });
  }, [initialSubtitleFile, subtitleFile]);

  const { saveSubtitleFile } = useSaveSubtitleFile(initialSubtitleFile);

  const deleteFileOfSubtitle = useCallback(() => {
    if (subtitleFile) {
      setSubtitleFile(null);
      return;
    }
    if (!src) {
      return;
    }
    saveSubtitleFile({ ...initialSubtitleFile, file: null }).then(
      (response: AxiosResponse<SubtitleFile>) => {
        setSrc(response.data.file || '');
      }
    );
  }, [initialSubtitleFile, saveSubtitleFile, src, subtitleFile]);

  const isUploadingSubtitleFile =
    !!uploadProgress?.progress && uploadProgress.progress < 1;
  return {
    upload,
    uploadProgress,
    subtitleFile,
    setSubtitleFile,
    isUploadingSubtitleFile,
    errorOfUploadSubtitleFile,
    src,
    deleteFileOfSubtitle,
  };
}

export function useSaveSubtitleFile(initial?: Partial<SubtitleFile> | null) {
  const { data, request, loading, setData, error } = useRequest({
    initial: subtitlefilesEndpoint.getInitial(initial),
    config: subtitlefilesEndpoint.save,
  });
  return {
    subtitleFile: data,
    saveSubtitleFile: request,
    isSaveSubtitleFile: loading,
    setSubtitleFile: setData,
    errorOfSaveSubtitleFile: error,
  };
}

export function useSubtitleFile(id?: string | string[]) {
  const { data, error, mutate } = useSwr<SubtitleFile>(subtitlefilesEndpoint.retrieve(id).url);
  const isSubtitleFileLoading = !data && !error;
  return {
    subtitleFile: data,
    subtitleFileErrors: error,
    mutateSubtitleFile: mutate,
    isSubtitleFileLoading,
  };
}

export function useSubtitleFiles(filters: Parameters<typeof subtitlefilesEndpoint.list>[0]) {
  const { data, error, mutate } = useSwr<SubtitleFile[]>([
    subtitlefilesEndpoint.list(filters).url,
    subtitlefilesEndpoint.list(filters),
  ]);
  const isSubtitleFilesLoading = !data && !error;
  return {
    subtitleFiles: data,
    subtitleFilesErrors: error,
    mutateSubtitleFiles: mutate,
    isSubtitleFilesLoading,
  };
}

export function useDeleteSubtitleFile(id?: string | string[]) {
  const { loading, request, setData, error, response } = useRequest({
    initial: id,
    config: subtitlefilesEndpoint.destroy,
  });
  return {
    deleteSubtitleFile: request,
    isDeletingSubtitleFile: loading,
    errorOfDeleteSubtitleFile: error,
  };
}

class SubtitleFilesEndpoint extends SaveEndpoint<SubtitleFile> {
  getInitial = (subtitleFile?: Partial<SubtitleFile> | null): SubtitleFile => ({
    id: '',
    video: '',
    file: null,
    studio_name: '',
    ...subtitleFile,
  });

  uploadSubtitle = (subtitleFile: SubtitleFile | string) => {
    const id = typeof subtitleFile === 'object' ? subtitleFile.id : subtitleFile;
    return {
      url: `${this.uri}${id}/upload_subtitle/`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      method: 'PUT',
    };
  };
}
export const subtitlefilesEndpoint = new SubtitleFilesEndpoint('/subtitlefilesEndpoint/');
export default subtitlefilesEndpoint;
