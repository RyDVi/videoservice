import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import React from "react";

interface DeleteProps {
  onDelete: () => void;
  onCancel: () => void;
  open: boolean;
}
export type DeleteDialogProps = DialogProps & DeleteProps;

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  onDelete,
  onCancel,
  ...props
}) => (
  <Dialog {...props}>
    <DialogTitle>Подтверждение удаления</DialogTitle>
    <DialogContent>
      <DialogContentText>Вы уверены, что хотите удалить?</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onDelete} autoFocus color="error">
        Удалить
      </Button>
      <Button onClick={onCancel}>Отменить</Button>
    </DialogActions>
  </Dialog>
);

export function useAcceptDialog(): {
  dialogProps: DeleteProps;
  acceptBefore: (callback: () => void) => void;
} {
  const [acceptCallback, setAcceptCallback] = React.useState<
    (() => void) | null
  >(null);

  const acceptBefore = React.useCallback((callback: () => void) => {
    setAcceptCallback(() => callback);
  }, []);

  const dialogProps = React.useMemo(() => {
    return {
      onDelete: () => {
        acceptCallback && acceptCallback();
        setAcceptCallback(null);
      },
      onCancel: () => {
        setAcceptCallback(null);
      },
      open: !!acceptCallback,
    };
  }, [acceptCallback]);

  return {
    dialogProps,
    acceptBefore,
  };
}
