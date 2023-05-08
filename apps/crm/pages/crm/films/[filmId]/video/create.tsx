import { CRMContainer, useCrmPageTitle } from "@modules/crm";
import { useRouter } from "next/router";
import { api } from "@modules/api";
import { useFilm } from "@modules/axios-hooks";
import Head from "next/head";
import { Box } from "@mui/material";
import * as paths from "src/paths";
import { CardForm, CreateEditVideoForm } from "src/forms";
import { CrmSidebar } from "src/CrmSidebar";

function CreateVideoPage() {
  const router = useRouter();
  const { filmId } = router.query;
  const { film } = useFilm(filmId);
  useCrmPageTitle(`Фильм "${film?.name || ""}. Создание серии."`);
  return (
    <>
      <Head>
        <title>{film?.name}</title>
      </Head>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gridColumnGap: 12,
          gridRowGap: "1em",
        }}
      >
        <CardForm title="Создание серии">
          <CreateEditVideoForm
            onSave={(video) =>
              router.push(
                paths.video({ filmId: filmId as string, videoId: video.id })
              )
            }
            onCancel={() => router.back()}
            data={api.video.getInitial({ film: filmId as string })}
          />
        </CardForm>
      </Box>
    </>
  );
}

CreateVideoPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default CreateVideoPage;
