import React from "react";
import { Dictionary } from "@modules/api/base/types";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { SearchField } from "@modules/client";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteDialog, useAcceptDialog } from "../dialogs";
import Link from "next/link";

interface DictionariesListProps {
  data: Dictionary[];
  onDelete: (data: Dictionary) => void;
  itemLink: (data: Dictionary) => string;
}

export const DictionariesList: React.FC<DictionariesListProps> = ({
  data,
  onDelete,
  itemLink,
}) => {
  const [search, setSearch] = React.useState("");
  const filteredDicts = React.useMemo(
    () =>
      data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [data, search]
  );
  const { acceptBefore, dialogProps } = useAcceptDialog();
  if (!data.length) {
    return <Box>Нет данных</Box>;
  }
  return (
    <Box>
      <SearchField onChange={(e) => setSearch(e.target.value)} />
      <List>
        {filteredDicts.map((data) => (
          <ListItem key={data.id}>
            <ListItemButton LinkComponent={Link} href={itemLink(data)}>
              <ListItemText primary={data.name} />
            </ListItemButton>
            <ListItemButton
              onClick={() => acceptBefore(() => onDelete(data))}
              sx={{
                color: "error.main",
                justifyContent: "flex-end",
                flex: "inherit",
              }}
            >
              <DeleteIcon /> Удалить
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DeleteDialog {...dialogProps} />
    </Box>
  );
};
