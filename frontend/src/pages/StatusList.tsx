import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  getTasksData,
  updateTaskData,
  deleteTaskData as deleteTaskAPI,
} from '../api/TodoApi';
import { StatusEnum, TaskI } from '../type/task';
import { useLocation, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '../components/Dialog';
import { reverseFormatStatus } from '../utils/helperFunc';

const StatusList = () => {
  const { status } = useParams<{ status: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const [editTaskDesc, setEditTaskDesc] = useState('');
  const [editTaskId, setEditTaskId] = useState<null | number>(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getData();
  }, [location.pathname]);

  const getData = () => {
    getTasksData('/todos').then((data) => {
      if (status) {
        const shortStatus = reverseFormatStatus(decodeURIComponent(status));
        const filteredData = data.filter((data) => data.status === shortStatus);
        setTasks(filteredData);
      }
    });
  };

  const renderTitle = () => {
    const shortStatus =
      status && reverseFormatStatus(decodeURIComponent(status));
    if (shortStatus === StatusEnum.InProgress) {
      return 'Status: In Progress';
    } else {
      return 'Status: Completed';
    }
  };

  const onUpdateTask = (task: TaskI) => {
    setEditTaskId(task.id);
    setIsEdit(true);
    setEditTaskDesc(task.task_desc);
  };

  const saveTask = (task: TaskI) => {
    setEditTaskId(null);
    setIsEdit(false);

    updateTaskData(`/todos/${task.id}/`, {
      task_desc: editTaskDesc,
      status: task.status,
    }).then(() => {
      getData();
    });
  };

  const deleteTask = (id: number) => {
    deleteTaskAPI(`/todos/${id}/`).then(() => {
      handleClose();
      getData();
    });
  };

  const renderDetail = (task: TaskI) => {
    return isEdit && editTaskId === task.id ? (
      <TextField
        label='Task'
        variant='outlined'
        fullWidth
        sx={{ mr: 2 }}
        value={editTaskDesc}
        onChange={(e) => setEditTaskDesc(e.target.value)}
      />
    ) : (
      <Typography
        sx={{ width: '100%', mr: { xs: 0, sm: 2 }, mb: { xs: 2, sm: 0 } }}
      >
        {task.task_desc}
      </Typography>
    );
  };

  const renderIcon = (task: TaskI) => {
    return isEdit && editTaskId === task.id ? (
      <Button
        variant='contained'
        startIcon={<SaveIcon />}
        onClick={() => saveTask(task)}
      >
        Save
      </Button>
    ) : (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant='contained'
          startIcon={<EditIcon />}
          onClick={() => onUpdateTask(task)}
        >
          Edit
        </Button>
        <Button
          variant='contained'
          color='error'
          startIcon={<DeleteIcon />}
          onClick={handleClickOpen}
        >
          Delete
        </Button>
      </Box>
    );
  };

  return (
    <Container>
      <Typography variant='h6' sx={{ mt: 5, textAlign: 'center' }}>
        {renderTitle()}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}>
        {tasks.map((task) => (
          <Paper
            key={task.id}
            sx={{
              display: { xs: 'flex' },
              flexDirection: { xs: 'column', sm: 'row' },
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {renderDetail(task)}
            <Box>
              {renderIcon(task)}
              <Dialog
                task={task}
                open={open}
                handleClose={handleClose}
                deleteTask={deleteTask}
              />
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default StatusList;
