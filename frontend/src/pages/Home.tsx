import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField, useTheme } from '@mui/material';
import {
  getTasksData,
  addTaskData as postTask,
  updateTaskData,
} from '../api/TodoApi';
import TaskCard from '../components/TaskCard';
import { TaskI } from '../type/task';
import { tokens } from '../theme/theme';

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<TaskI[]>([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getTasksData('/todos').then((data) => {
      setTasks(data);
    });
  };

  const addTask = () => {
    if (newTask) {
      postTask('/todos/', {
        task_desc: newTask,
        status: 'NS',
      }).then(() => {
        getData();
        setNewTask('');
      });
    }
  };

  const update = (task: TaskI, status: string) => {
    updateTaskData(`/todos/${task.id}/`, {
      task_desc: task.task_desc,
      status: status,
    }).then(() => {
      getData();
    });
  };

  return (
    <Container>
      <Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            mt: 5,
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center' },
          }}
        >
          <TextField
            label='Task'
            variant='outlined'
            required
            fullWidth
            sx={{
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },
            }}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button
            variant='contained'
            sx={{
              height: '3.5rem',
              width: { xs: '40%', sm: '20%' },
              ...(theme.palette.mode === 'dark' && {
                backgroundColor: colors.grey[800],
              }),
            }}
            onClick={addTask}
          >
            Add
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}>
          {tasks
            .slice()
            .reverse()
            .map((task) => (
              <TaskCard task={task} updateTask={update} key={task.id} />
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
