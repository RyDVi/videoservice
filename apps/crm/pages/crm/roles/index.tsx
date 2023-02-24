import {
  useDeleteGenre,
  useDeletePersonRole,
  useGenres,
  usePersonRoles,
} from "@modules/api";
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
  const { isPersonRolesLoading, personRoles } = usePersonRoles();
  const { deletePersonRole } = useDeletePersonRole();
  return (
    <PageProvider title="Роли персон">
      <Head>
        <title>Роли персон</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel createLink={paths.role({ roleId: "create" })} />
        {isPersonRolesLoading ? (
          <CircularProgress />
        ) : (
          <DictionariesList
            data={personRoles || []}
            onDelete={({ id }) => deletePersonRole(id)}
            itemLink={({ id }) => paths.role({ roleId: id })}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
}

export default GenresPage;
