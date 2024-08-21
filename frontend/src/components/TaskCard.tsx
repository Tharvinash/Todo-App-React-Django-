import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { Task } from '../type/task';

interface TaskI {
  task: Task;
  updateTask: (task: Task, status: string) => void;
}
const TaskCard = (props: TaskI) => {
  const handleChange = (event: any, task: Task) => {
    props.updateTask(task, reverseFormatStatus(event.target.value));
  };

  const reverseFormatStatus = (status: string): string => {
    if (status === 'Not Started') {
      return 'NS';
    } else if (status === 'In Progress') {
      return 'IP';
    } else {
      return 'C';
    }
  };

  const formatStatus = (status: string) => {
    if (status === 'NS') {
      return 'Not Started';
    }
    if (status === 'IP') {
      return 'In Progress';
    }
    if (status === 'C') {
      return 'Completed';
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        p: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography sx={{ width: '80%' }}>{props.task.task}</Typography>

      <FormControl sx={{ width: '20%' }}>
        <InputLabel id='select-label'>Status</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={formatStatus(props.task.status)}
          label='Status'
          onChange={(e) => handleChange(e, props.task)}
        >
          <MenuItem value='Not Started'>Not Started</MenuItem>
          <MenuItem value='In Progress'>In Progress</MenuItem>
          <MenuItem value='Completed'>Completed</MenuItem>
        </Select>
      </FormControl>
    </Paper>
  );
};

export default TaskCard;
