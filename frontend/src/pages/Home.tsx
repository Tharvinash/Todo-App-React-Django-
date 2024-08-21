import { useEffect, useState } from 'react';
import { Box, Button, Container, TextField } from '@mui/material';
import { fetchData, addTask as postTask, updateTask } from '../api/TodoApi';
import TaskCard from '../components/TaskCard';
import { Task } from '../type/task';

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchData('/todos').then((data) => {
      setTasks(data);
    });
  };

  const addTask = () => {
    postTask('/todos/', {
      task: newTask,
      status: 'NS',
    }).then(() => {
      setNewTask('');
    });
  };

  const update = (task: Task, status: string) => {
    updateTask(`/todos/${task.id}/`, {
      task: task.task,
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
