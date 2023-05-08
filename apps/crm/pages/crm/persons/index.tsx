import { useDeletePerson, usePersons } from "@modules/axios-hooks";
import { formatFullName, searchPerson } from "@modules/utils";
import { CircularProgress } from "@mui/material";
import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import Head from "next/head";
import * as paths from "src/paths";
import { CrmSidebar } from "src/CrmSidebar";
import { DictionaryPanel, SimpleList } from "src/elements";

function PersonsPage() {
  const { persons, isPersonsLoading } = usePersons();
  const { deletePerson } = useDeletePerson();
  useCrmPageTitle("Персоны");
  return (
    <>
      <Head>
        <title>Персоны</title>
      </Head>
      <DictionaryPanel createLink={paths.person({ personId: "create" })} />
      {isPersonsLoading ? (
        <CircularProgress />
      ) : (
        <SimpleList
          data={persons || []}
          onDelete={({ id }) => deletePerson(id)}
          itemLink={({ id }) => paths.person({ personId: id })}
          primaryText={(d) => formatFullName(d)}
          onSearch={searchPerson}
        />
      )}
    </>
  );
}

PersonsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default PersonsPage;
