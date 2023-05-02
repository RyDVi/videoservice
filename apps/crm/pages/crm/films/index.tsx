import { CRMContainer, FilmsTable, useCrmPageTitle } from "@modules/crm";
import { CrmSidebar } from "src/CrmSidebar";
import { useRouter } from "next/router";
import { useQuery } from "@modules/nextjs";
import { useFilms } from "@modules/request-hooks";
import { Box, Button, Paper } from "@mui/material";
import Head from "next/head";
import { useGridSortModel, useMuiPage } from "@modules/mui-adapter";
import { useMemo } from "react";
import * as paths from "src/paths";
import AddIcon from "@mui/icons-material/Add";
import { GridToolbarContainer } from "@mui/x-data-grid";

const FilmsToolbar: React.FC = () => {
  const router = useRouter();
  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        onClick={() => router.push(paths.filmCreate({}))}
      >
        Создать фильм
      </Button>
    </GridToolbarContainer>
  );
};

function FilmsPage() {
  const query = useQuery();
  const router = useRouter();
  const [page, setPage, pageSize, setPageSize] = useMuiPage({ pageSize: 25 });
  const filters = useMemo(
    () => ({ ...query, page: page + 1, page_size: pageSize }),
    [page, pageSize, query]
  );
  const { films, isFilmsLoading } = useFilms(filters);
  const [sortModel, setSortModel] = useGridSortModel();
  useCrmPageTitle("Фильмы");
  return (
    <>
      <Head>
        <title>Фильмы</title>
      </Head>
      <Paper sx={{ height: "90vh" }}>
        <Box sx={{ height: 1, width: 1 }}>
          <FilmsTable
            rows={films?.results || []}
            page={page}
            pageSize={pageSize}
            components={{ Toolbar: FilmsToolbar }}
            onDelete={() => null}
            onRowClick={(film) =>
              router.push(paths.film({ filmId: String(film.id) }))
            }
            disableSelectionOnClick
            onPageSizeChange={setPageSize}
            onPageChange={setPage}
            onSortModelChange={setSortModel}
            sortModel={sortModel}
            paginationMode="server"
            rowCount={films ? films.count : 0}
            loading={isFilmsLoading}
          />
        </Box>
      </Paper>
    </>
  );
}

FilmsPage.getLayout = function (page: React.ReactElement) {
  return <CRMContainer sidebarContent={<CrmSidebar />}>{page}</CRMContainer>;
};

export default FilmsPage;
