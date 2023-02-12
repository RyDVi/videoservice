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

export interface MultiSelectData<T> {
  data: T[];
  possibleValues: T[];
  onAdd: (value: T) => Promise<any>;
  onDelete: (item: T) => void;
}

interface MultiSelectForm<T> extends MultiSelectData<T> {
  renderListItemContent: (item: T) => React.ReactNode;
}

export function MultiSelecForm<T>({
  data,
  renderListItemContent,
  onDelete,
  onAdd,
  possibleValues,
}: MultiSelectForm<T>) {
  const [isOpenModal, { setTrue: openModal, setFalse: closeModal }] =
    useBoolean(false);
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
            <ListItemButton onClick={() => onDelete(item)}>
              <DeleteIcon /> Удалить
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Modal
        open={isOpenModal}
        onClose={closeModal}
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          height: 500,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          overflow:'auto'
        }}
      >
        <List>
          {possibleValues.map((value) => (
            <ListItemButton
              onClick={() => {
                onAdd(value).then(closeModal);
              }}
            >
              {renderListItemContent(value)}
            </ListItemButton>
          ))}
        </List>
      </Modal>
    </Box>
  );
}
