import { useDeletePerson, usePersons } from "@modules/api";
import { formatFullName, searchPerson } from "@modules/utils";
import { CircularProgress } from "@mui/material";
import {
  CRMContainer,
  CrmSidebar,
  DictionaryPanel,
  paths,
  SimpleList,
  useCrmPageTitle,
} from "crmui";
import Head from "next/head";

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
