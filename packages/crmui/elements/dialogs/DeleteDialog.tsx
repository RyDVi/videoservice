import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  DialogContentText,
} from '@mui/material';

export interface DeleteDialogProps extends DialogProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ onDelete, onCancel, ...props }) => (
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

export default DeleteDialog;
