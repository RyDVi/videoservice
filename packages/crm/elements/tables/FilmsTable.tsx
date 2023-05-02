import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCallback, useMemo } from "react";
import React from "react";

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
