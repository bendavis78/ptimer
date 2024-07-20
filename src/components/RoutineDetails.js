import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField 
} from '@mui/material';

function RoutineDetails() {
  const { routineName } = useParams();
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');

  useEffect(() => {
    const storedRoutines = JSON.parse(localStorage.getItem('workoutRoutines') || '[]');
    const currentRoutine = storedRoutines.find(routine => routine.name === routineName);
    if (currentRoutine && currentRoutine.exercises) {
      setExercises(currentRoutine.exercises);
    }
  }, [routineName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewExerciseName('');
  };

  const handleAddExercise = () => {
    if (newExerciseName.trim() !== '') {
      const updatedExercises = [...exercises, { name: newExerciseName.trim() }];
      setExercises(updatedExercises);
      
      const storedRoutines = JSON.parse(localStorage.getItem('workoutRoutines') || '[]');
      const updatedRoutines = storedRoutines.map(routine => 
        routine.name === routineName 
          ? { ...routine, exercises: updatedExercises } 
          : routine
      );
      localStorage.setItem('workoutRoutines', JSON.stringify(updatedRoutines));
      
      handleClose();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {decodeURIComponent(routineName)}
      </Typography>
      <List>
        {exercises.map((exercise, index) => (
          <ListItem key={index}>
            <ListItemText primary={exercise.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2 }}>
        Add Exercise
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Exercise</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Exercise Name"
            type="text"
            fullWidth
            variant="standard"
            value={newExerciseName}
            onChange={(e) => setNewExerciseName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddExercise} data-testid="dialog-add-exercise-button">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RoutineDetails;
