import useSwr from "swr";
import { AxiosProgressEvent, AxiosResponse } from "axios";
import { RequestError, useAxiosContext, useAxiosRequest } from "../axios";
import { subtitlefiles, SubtitleFile } from "@modules/api";
import { useCallback, useState } from "react";

export function useUploadSubtitleFile(initialSubtitleFile: SubtitleFile) {
  const axiosInstance = useAxiosContext();
  const [src, setSrc] = useState(initialSubtitleFile.file || "");
  const [errorOfUploadSubtitleFile, setError] = useState<File | null>();
  const [uploadProgress, setUploadProgress] =
    useState<AxiosProgressEvent | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  const upload = useCallback(() => {
    if (!subtitleFile) return {};
    const formData = new FormData();
    formData.append("file", subtitleFile);
    return axiosInstance
      .put(subtitlefiles.uploadSubtitle(initialSubtitleFile).url, formData, {
        ...subtitlefiles.uploadSubtitle(initialSubtitleFile),
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
  }, [axiosInstance, initialSubtitleFile, subtitleFile]);

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
        setSrc(response.data.file || "");
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
  const { data, request, loading, setData, error } = useAxiosRequest({
    initial: subtitlefiles.getInitial(initial),
    config: subtitlefiles.save,
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
  const { data, error, mutate } = useSwr<SubtitleFile>(
    subtitlefiles.retrieve(id).url
  );
  const isSubtitleFileLoading = !data && !error;
  return {
    subtitleFile: data,
    subtitleFileErrors: error,
    mutateSubtitleFile: mutate,
    isSubtitleFileLoading,
  };
}

export function useSubtitleFiles(
  filters: Parameters<typeof subtitlefiles.list>[0]
) {
  const { data, error, mutate } = useSwr<SubtitleFile[]>([
    subtitlefiles.list(filters).url,
    subtitlefiles.list(filters),
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
  const { loading, request, error } = useAxiosRequest({
    initial: id,
    config: subtitlefiles.destroy,
  });
  return {
    deleteSubtitleFile: request,
    isDeletingSubtitleFile: loading,
    errorOfDeleteSubtitleFile: error,
  };
}
