import { useDeletePersonRole, usePersonRoles } from "@modules/axios-hooks";
import { CircularProgress } from "@mui/material";
import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import Head from "next/head";
import * as paths from "src/paths";
import { CrmSidebar } from "src/CrmSidebar";
import { DictionariesList, DictionaryPanel } from "src/elements";

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
