import {
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const StatusList = () => {
  return (
    <Container>
      <Typography variant='h6' sx={{ mt: 5, textAlign: 'center' }}>
        Status
      </Typography>
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
          <Typography sx={{ width: '100%' }}>Task</Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant='contained' startIcon={<EditIcon />}>
              Edit
            </Button>
            <Button
              variant='contained'
              color='error'
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default StatusList;
