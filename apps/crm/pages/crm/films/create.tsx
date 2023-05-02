import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";
import { useRouter } from "next/router";
import Head from "next/head";
import { styled } from "@mui/material";
import * as paths from "src/paths";
import { CardForm, CreateEditFilmForm } from "src/forms";

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
