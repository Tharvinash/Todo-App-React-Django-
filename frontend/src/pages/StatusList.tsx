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
  fetchData,
  updateTask,
  deleteTask as deleteTaskAPI,
} from '../api/TodoApi';
import { Task } from '../type/task';
import { useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import Dialog from '../components/Dialog';

const StatusList = () => {
  const { status } = useParams<{ status: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTask, setEditTask] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reverseFormatStatus = (status: string): string => {
    if (status === 'Not Started') {
      return 'NS';
    } else if (status === 'Completed') {
      return 'C';
    } else {
      return 'IP';
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchData('/todos').then((data) => {
      if (status) {
        const shortStatus = reverseFormatStatus(decodeURIComponent(status));
        const filteredData = data.filter((data) => data.status === shortStatus);
        setTasks(filteredData);
      }
    });
  };

  const onUpdateTask = (task: string) => {
    setIsEdit(true);
    console.log(task);
    setEditTask(task);
  };

  const saveTask = (task: Task) => {
    setIsEdit(false);

    updateTask(`/todos/${task.id}/`, {
      task: editTask,
      status: task.status,
    }).then(() => {
      getData();
    });
  };

  const deleteTask = (id: number) => {
    deleteTaskAPI(`/todos/${id}/`).then(() => {
      getData();
    });
  };

  return (
    <Container>
      <Typography variant='h6' sx={{ mt: 5, textAlign: 'center' }}>
        Status
      </Typography>

      <Box sx={{ mt: 5 }}>
        {tasks.map((task) => (
          <Paper
            key={task.id}
            sx={{
              display: 'flex',
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            {isEdit ? (
              <TextField
                label='Task'
                variant='outlined'
                fullWidth
                sx={{ mr: 2 }}
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
              />
            ) : (
              <Typography sx={{ width: '100%' }}>{task.task}</Typography>
            )}

            <Box>
              {isEdit ? (
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
                    onClick={() => onUpdateTask(task.task)}
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
              )}
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
