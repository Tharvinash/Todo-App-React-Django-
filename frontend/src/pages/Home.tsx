import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import {
  getTasksData,
  addTaskData as postTask,
  updateTaskData,
} from '../api/TodoApi';
import TaskCard from '../components/TaskCard';
import { TaskI } from '../type/task';

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<TaskI[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getTasksData('/todos').then((data) => {
      setTasks(data);
    });
  };

  const addTask = () => {
    postTask('/todos/', {
      task_desc: newTask,
      status: 'NS',
    }).then(() => {
      getData();
      setNewTask('');
    });
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
        <Box sx={{ display: 'flex', width: '100%', mt: 5 }}>
          <TextField
            label='Task'
            variant='outlined'
            fullWidth
            sx={{ mr: 2 }}
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant='contained' sx={{ width: '10%' }} onClick={addTask}>
            Add
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 5 }}>
          {tasks.map((task) => (
            <TaskCard task={task} updateTask={update} key={task.id} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
