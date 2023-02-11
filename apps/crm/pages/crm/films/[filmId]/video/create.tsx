import CRMContainer from 'crmui/containers/shell/CRMContainer';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
import { PageProvider } from 'crmui/contexts/page/PageContext';
import { useRouter } from 'next/router';
import { api, useFilm } from '@modules/api';
import Head from 'next/head';
import { Box } from '@mui/material';
import { CardForm } from 'crmui/elements/forms/Form';
import paths from 'crmui/routes/paths';
import { CreateEditVideoForm } from 'crmui/elements/forms/VideoForm';

const CreateVideoPage: React.FC = () => {
  const router = useRouter();
  const { filmId } = router.query;
  const { film } = useFilm(filmId);
  return (
    <PageProvider title={`Фильм "${film?.name || ''}. Создание серии."`}>
      <Head>
        <title>{film?.name}</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gridColumnGap: 12,
            gridRowGap: '1em',
          }}
        >
          <CardForm title="Создание серии">
            <CreateEditVideoForm
              onSave={(video) =>
                router.push(paths.video({ filmId: filmId as string, videoId: video.id }))
              }
              onCancel={() => router.back()}
              data={api.video.getInitial({ film: filmId as string })}
            />
          </CardForm>
        </Box>
      </CRMContainer>
    </PageProvider>
  );
};

export default CreateVideoPage;
