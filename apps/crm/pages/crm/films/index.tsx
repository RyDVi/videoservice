import CRMContainer from 'crmui/containers/shell/CRMContainer';
import CrmSidebar from 'crmui/sidebar/CrmSidebar';
import { PageProvider } from 'crmui/contexts/page/PageContext';
import { FilmsTable } from 'crmui/elements';
import { useRouter } from 'next/router';
import { useQuery } from '@modules/nextjs';
import { useFilms } from '@modules/api';
import { Box, Paper } from '@mui/material';
import { FilmsToolbar } from 'crmui/elements/tables/FilmsTable';
import paths from 'crmui/routes/paths';
import Head from 'next/head';
import { useGridSortModel, useMuiPage } from '@modules/mui-adapter';
import { useMemo } from 'react';

const FilmsPage: React.FC = () => {
  const query = useQuery();
  const router = useRouter();
  const [page, setPage, pageSize, setPageSize] = useMuiPage({ pageSize: 25 });
  const filters = useMemo(
    () => ({ ...query, page: page + 1, page_size: pageSize }),
    [page, pageSize, query]
  );
  const { films } = useFilms(filters);
  const [sortModel, setSortModel] = useGridSortModel();
  return (
    <PageProvider title="Фильмы">
      <Head>
        <title>Фильмы</title>
      </Head>
      <CRMContainer sidebarContent={<CrmSidebar />}>
        <Paper sx={{ height: '90vh' }}>
          <Box sx={{ height: 1, width: 1 }}>
            <FilmsTable
              rows={films?.results || []}
              page={page}
              pageSize={pageSize}
              components={{ Toolbar: FilmsToolbar }}
              onDelete={() => null}
              onRowClick={(film) => router.push(paths.film({ filmId: String(film.id) }))}
              disableSelectionOnClick
              onPageSizeChange={setPageSize}
              onPageChange={setPage}
              onSortModelChange={setSortModel}
              sortModel={sortModel}
            />
          </Box>
        </Paper>
      </CRMContainer>
    </PageProvider>
  );
};

export default FilmsPage;
