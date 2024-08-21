import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { StatusEnum, TaskI } from '../type/task';
import { formatStatus, reverseFormatStatus } from '../utils/helperFunc';

interface TaskCardI {
  task: TaskI;
  updateTask: (task: TaskI, status: string) => void;
}
const TaskCard = (props: TaskCardI) => {
  const handleChange = (event: any, task: TaskI) => {
    props.updateTask(task, reverseFormatStatus(event.target.value));
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
      <Typography sx={{ width: '80%' }}>{props.task.task_desc}</Typography>

      <FormControl sx={{ width: '20%' }}>
        <InputLabel id='select-label'>Status</InputLabel>
        <Select
          labelId='select-label'
          id='select'
          value={formatStatus(props.task.status as StatusEnum)}
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
