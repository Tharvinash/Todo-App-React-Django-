import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { Status, StatusEnum, TaskI } from '../type/task';
import { formatStatus, reverseFormatStatus } from '../utils/helperFunc';

interface TaskCardI {
  task: TaskI;
  updateTask: (task: TaskI, status: Status) => void;
}
const TaskCard = (props: TaskCardI) => {
  const handleChange = (event: SelectChangeEvent<string>, task: TaskI) => {
    props.updateTask(task, reverseFormatStatus(event.target.value));
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: { sm: 'flex' },
        flexDirection: { sm: 'col', md: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          width: { sm: '80%' },
          mb: { xs: 2, sm: 0 },
        }}
      >
        {props.task.task_desc}
      </Typography>

      <FormControl sx={{ width: { sm: '20%' }, display: { xs: 'flex' } }}>
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
