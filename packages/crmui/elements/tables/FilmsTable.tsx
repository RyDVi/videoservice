import { Button } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { paths } from "crmui";
import { useCallback, useMemo } from "react";

export const FilmsToolbar: React.FC = () => {
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

interface CRUDActions {
  onDelete: (id: string | number) => void;
}

export const FilmsTable: React.FC<
  Omit<Parameters<typeof DataGrid>[0], "columns"> & CRUDActions
> = ({ onDelete, ...props }) => {
  const handleDeleteClick = useCallback(
    (id: string | number) => () => onDelete(id),
    [onDelete]
  );
  const filmColumns: GridColumns = useMemo(
    () => [
      { field: "name", headerName: "Наименование", width: 300 },
      {
        field: "description_short",
        headerName: "Краткое описание",
        width: 150,
      },
      { field: "description_full", headerName: "Полное описание", width: 160 },
      { field: "country", headerName: "Страна", width: 80 },
      { field: "content_rating", headerName: "Рейтинг контента", width: 150 },
      { field: "genres", headerName: "Жанры", width: 150 },
      {
        field: "actions",
        type: "actions",
        headerName: "Действия",
        width: 150,
        cellClassName: "actions",
        getActions: ({ id }: GridRowParams) => {
          return [
            <GridActionsCellItem
              key={id}
              icon={<DeleteIcon />}
              label="Удалить"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ],
    [handleDeleteClick]
  );
  return (
    <DataGrid columns={filmColumns} checkboxSelection pagination {...props} />
  );
};
