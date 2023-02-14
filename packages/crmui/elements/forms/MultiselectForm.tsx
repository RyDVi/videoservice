import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Modal,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useBoolean } from "../../../hooks/boolean";
import { SearchField } from "@modules/client";
import { DeleteDialog, useAcceptDialog } from "../dialogs";

export interface MultiSelectData<T> {
  data: T[];
  possibleValues: T[];
  onAdd: (value: T) => Promise<any>;
  onDelete: (item: T) => void;
}

interface MultiSelectForm<T> extends MultiSelectData<T> {
  renderListItemContent: (item: T) => React.ReactNode;
  filterSearch: (search: string, items: T[]) => T[];
  withAccept?: boolean;
}

// TODO: нужно разнести на части и зарефакторить
export function MultiSelecForm<T>({
  data,
  renderListItemContent,
  onDelete,
  onAdd,
  possibleValues,
  filterSearch,
  withAccept,
}: MultiSelectForm<T>) {
  const [isOpenModal, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);
  const [search, setSearch] = React.useState("");
  const filteredPossibleValues = React.useMemo(
    () => filterSearch(search, possibleValues),
    [filterSearch, possibleValues, search]
  );
  const { acceptBefore, dialogProps } = useAcceptDialog();
  const handleCloseModal = React.useCallback(() => {
    setSearch("");
    closeModal();
  }, [closeModal]);
  return (
    <Box>
      <Box>
        <Button onClick={openModal} color="success">
          <AddIcon /> Добавить
        </Button>
      </Box>
      <List>
        {data.map((item) => (
          <ListItem key={JSON.stringify(item)}>
            {renderListItemContent(item)}
            <ListItemButton
              onClick={() => {
                if (withAccept) {
                  acceptBefore(() => onDelete(item));
                  return;
                }
                onDelete(item);
              }}
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
      <Modal open={isOpenModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            p: 4,
            overflow: "auto",
          }}
        >
          <SearchField
            placeholder="Поиск категории"
            onSearch={setSearch}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <List>
            {filteredPossibleValues.map((value) => (
              <ListItemButton
                key={JSON.stringify(value)}
                onClick={() => onAdd(value).then(handleCloseModal)}
              >
                {renderListItemContent(value)}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Modal>
      <DeleteDialog {...dialogProps} />
    </Box>
  );
}
