import { useDeleteGenre, useGenres } from "@modules/api";
import { CircularProgress } from "@mui/material";
import {
  CRMContainer,
  CrmSidebar,
  DictionariesList,
  DictionaryPanel,
  paths,
  useCrmPageTitle,
} from "crmui";
import Head from "next/head";

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
