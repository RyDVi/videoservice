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
import { DeleteDialog, useAcceptDialog } from "@modules/crm";
import Link from "next/link";

interface SimpleListProps<D extends { id: string }> {
  data: D[];
  onDelete: (data: D) => void;
  itemLink: (data: D) => string;
  primaryText: (data: D) => React.ReactNode;
  secondaryText?: (data: D) => React.ReactNode;
  onSearch: (search: string, data: D[]) => D[];
}

export function SimpleList<D extends { id: string }>({
  data,
  onDelete,
  itemLink,
  primaryText,
  secondaryText,
  onSearch,
}: SimpleListProps<D>) {
  const [search, setSearch] = React.useState("");
  const filteredDicts = React.useMemo(
    () => onSearch(search, data),
    [data, onSearch, search]
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
            <ListItemButton component={Link} href={itemLink(data)}>
              <ListItemText
                primary={primaryText(data)}
                secondary={secondaryText && secondaryText(data)}
              />
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
}

interface DictionariesListProps<D extends Dictionary>
  extends Omit<
    SimpleListProps<D>,
    "primaryText" | "secondaryText" | "onSearch"
  > {}

export function DictionariesList<D extends Dictionary>({
  data,
  onDelete,
  itemLink,
}: DictionariesListProps<D>) {
  const handleSearch = React.useCallback(
    (search: string, data: D[]) =>
      data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    []
  );
  return (
    <SimpleList
      data={data}
      onDelete={onDelete}
      itemLink={itemLink}
      onSearch={handleSearch}
      primaryText={(d) => d.name}
    />
  );
}
