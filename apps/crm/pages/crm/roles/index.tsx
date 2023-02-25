import { useDeletePersonRole, usePersonRoles } from "@modules/api";
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

function PersonRolesPage() {
  const { isPersonRolesLoading, personRoles } = usePersonRoles();
  const { deletePersonRole } = useDeletePersonRole();
  useCrmPageTitle("Роли персон");
  return (
    <>
      <Head>
        <title>Роли персон</title>
      </Head>
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
    </>
  );
}

PersonRolesPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default PersonRolesPage;
