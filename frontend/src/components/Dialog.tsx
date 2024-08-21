import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Task } from '../type/task';

interface DialogComponentI {
  task: Task;
  open: boolean;
  handleClose: () => void;
  deleteTask: (id: number) => void;
}
const DialogComponent = (props: DialogComponentI) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Delete'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete the task "{props.task.task}".
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='error'
          onClick={() => props.deleteTask(props.task.id)}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogComponent;
