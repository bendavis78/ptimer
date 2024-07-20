import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from '@mui/material';

function RoutineList() {
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoutines = localStorage.getItem('workoutRoutines');
    if (storedRoutines) {
      setRoutines(JSON.parse(storedRoutines));
    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoutineName('');
  };

  const handleAddRoutine = () => {
    if (newRoutineName.trim() !== '') {
      const updatedRoutines = [...routines, { name: newRoutineName.trim() }];
      setRoutines(updatedRoutines);
      localStorage.setItem('workoutRoutines', JSON.stringify(updatedRoutines));
      handleClose();
    }
  };

  const handleRoutineClick = (routineName) => {
    navigate(`/routine/${encodeURIComponent(routineName)}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Workout Routines
      </Typography>
      <List>
        {routines.map((routine, index) => (
          <ListItem 
            key={index} 
            button 
            onClick={() => handleRoutineClick(routine.name)}
          >
            <ListItemText primary={routine.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2 }}>
        Add Routine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Routine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Routine Name"
            type="text"
            fullWidth
            variant="standard"
            value={newRoutineName}
            onChange={(e) => setNewRoutineName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddRoutine} data-testid="dialog-add-button">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RoutineList;
