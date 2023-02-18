import {
  CrmSidebar,
  PageProvider,
  CRMContainer,
  CreateEditGenreForm,
} from "crmui";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { useGenre } from "@modules/api";

const GenrePage: React.FC = () => {
  const router = useRouter();
  const genreId = router.query.genreId as string;
  const isCreating = genreId === "create";
  const { genre, isGenreLoading } = useGenre(isCreating ? null : genreId);
  return (
    <PageProvider title={isCreating ? "Создание жанра" : `Жанр ${genre?.name}`}>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        {isGenreLoading && !isCreating ? (
          <CircularProgress />
        ) : (
          <CreateEditGenreForm
            data={genre}
            onSave={() => {
              router.back();
            }}
            onCancel={() => {
              router.back();
            }}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
};

export default GenrePage;
