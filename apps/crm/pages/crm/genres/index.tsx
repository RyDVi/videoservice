import { useDeleteGenre, useGenres } from "@modules/api";
import { CircularProgress } from "@mui/material";
import {
  CRMContainer,
  CrmSidebar,
  DictionariesList,
  DictionaryPanel,
  PageProvider,
  paths,
} from "crmui";
import Head from "next/head";

function GenresPage() {
  const { genres, isGenresLoading } = useGenres();
  const { deleteGenre } = useDeleteGenre();
  return (
    <PageProvider title="Жанры">
      <Head>
        <title>Жанры</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel
          createLink={paths.genre({ genreId: "create" })}
        />
        {isGenresLoading ? (
          <CircularProgress />
        ) : (
          <DictionariesList
            data={genres || []}
            onDelete={({ id }) => deleteGenre(id)}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
}

export default GenresPage;
