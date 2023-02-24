import { useDeletePerson, usePersons } from "@modules/api";
import { formatFullName } from "@modules/utils";
import { CircularProgress } from "@mui/material";
import {
  CRMContainer,
  CrmSidebar,
  DictionariesList,
  DictionaryPanel,
  PageProvider,
  paths,
  SimpleList,
} from "crmui";
import Head from "next/head";

function GenresPage() {
  const { persons, isPersonsLoading } = usePersons();
  const { deletePerson } = useDeletePerson();
  return (
    <PageProvider title="Жанры">
      <Head>
        <title>Люди</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <DictionaryPanel createLink={paths.person({ personId: "create" })} />
        {isPersonsLoading ? (
          <CircularProgress />
        ) : (
          <SimpleList
            data={persons || []}
            onDelete={({ id }) => deletePerson(id)}
            itemLink={({ id }) => paths.person({ personId: id })}
            primaryText={(d) => formatFullName(d)}
            onSearch={(search, data) => {
              const searchText = search.toLowerCase();
              return data.filter(
                (d) =>
                  d.firstname.toLowerCase().includes(searchText) ||
                  d.lastname.toLowerCase().includes(searchText)
              );
            }}
          />
        )}
      </CRMContainer>
    </PageProvider>
  );
}

export default GenresPage;
