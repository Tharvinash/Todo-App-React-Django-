import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const Home = () => {
  const [age, setAge] = useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
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
          />
          <Button variant='contained' sx={{ width: '10%' }}>
            Add
          </Button>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Paper
            sx={{
              display: 'flex',
              p: 2,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography sx={{ width: '80%' }}>Task</Typography>

            <FormControl sx={{ width: '20%' }}>
              <InputLabel id='select-label'>Status</InputLabel>
              <Select
                labelId='select-label'
                id='select'
                value={age}
                label='Status'
                onChange={handleChange}
              >
                <MenuItem value='Not Started'>Not Started</MenuItem>
                <MenuItem value='In Progress'>In Progress</MenuItem>
                <MenuItem value='Completed'>Completed</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
