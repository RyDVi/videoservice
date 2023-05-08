import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { useRouter } from "next/router";
import React from "react";
import { CircularProgress } from "@mui/material";
import { useGenre } from "@modules/axios-hooks";
import { CreateEditGenreForm } from "src/forms";
import { CrmSidebar } from "src/CrmSidebar";

function GenrePage() {
  const router = useRouter();
  const genreId = router.query.genreId as string;
  const isCreating = genreId === "create";
  const { genre, isGenreLoading } = useGenre(isCreating ? null : genreId);
  useCrmPageTitle(isCreating ? "Создание жанра" : `Жанр ${genre?.name}`);
  return (
    <>
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
    </>
  );
}

GenrePage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default GenrePage;
