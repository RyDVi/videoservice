import {
  CardForm,
  CRMContainer,
  CrmSidebar,
  PageProvider,
  CreateEditFilmForm,
  paths,
} from "crmui";
import { useRouter } from "next/router";
import Head from "next/head";
import { styled } from "@mui/material";

const CreateFilmCard = styled(CardForm)({
  maxWidth: 500,
});

const FilmsPage: React.FC = () => {
  const router = useRouter();
  return (
    <PageProvider title="Создание фильма">
      <Head>
        <title>Создание фильма</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <CreateFilmCard title="Создание фильма">
          <CreateEditFilmForm
            onSave={(film) => router.push(paths.film({ filmId: film.id }))}
            onCancel={() => router.back()}
          />
        </CreateFilmCard>
      </CRMContainer>
    </PageProvider>
  );
};

export default FilmsPage;
