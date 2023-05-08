import { useDeleteGenre, useGenres } from "@modules/axios-hooks";
import { CircularProgress } from "@mui/material";
import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import Head from "next/head";
import * as paths from "src/paths";
import { CrmSidebar } from "src/CrmSidebar";
import { DictionariesList, DictionaryPanel } from "src/elements";

function GenresPage() {
  const { genres, isGenresLoading } = useGenres();
  const { deleteGenre } = useDeleteGenre();
  useCrmPageTitle("Жанры");
  return (
    <>
      <Head>
        <title>Жанры</title>
      </Head>
      <DictionaryPanel createLink={paths.genre({ genreId: "create" })} />
      {isGenresLoading ? (
        <CircularProgress />
      ) : (
        <DictionariesList
          data={genres || []}
          onDelete={({ id }) => deleteGenre(id)}
          itemLink={({ id }) => paths.genre({ genreId: id })}
        />
      )}
    </>
  );
}

GenresPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default GenresPage;
