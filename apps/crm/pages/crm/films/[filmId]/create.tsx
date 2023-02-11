import CRMContainer from "crmui/containers/shell/CRMContainer";
import CrmSidebar from "crmui/sidebar/CrmSidebar";
import { PageProvider } from "crmui/contexts/page/PageContext";
import { CreateEditFilmForm } from "crmui/elements/forms/FilmForm";
import { useRouter } from "next/router";
import paths from "crmui/routes/paths";
import Head from "next/head";
import { CardForm } from "crmui/elements/forms/Form";
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
