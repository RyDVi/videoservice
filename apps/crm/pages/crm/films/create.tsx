import {
  CardForm,
  CRMContainer,
  CrmSidebar,
  CreateEditFilmForm,
  paths,
  useCrmPageTitle,
} from "crmui";
import { useRouter } from "next/router";
import Head from "next/head";
import { styled } from "@mui/material";

const CreateFilmCard = styled(CardForm)({
  maxWidth: 500,
});

function FilmsPage() {
  const router = useRouter();
  useCrmPageTitle("Создание фильма");
  return (
    <>
      <Head>
        <title>Создание фильма</title>
      </Head>
      <CreateFilmCard title="Создание фильма">
        <CreateEditFilmForm
          onSave={(film) => router.push(paths.film({ filmId: film.id }))}
          onCancel={() => router.back()}
        />
      </CreateFilmCard>
    </>
  );
}

FilmsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default FilmsPage;
