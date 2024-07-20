import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const decodedRoutineName = decodeURIComponent(routineName);
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');

  useEffect(() => {
    const storedRoutines = JSON.parse(localStorage.getItem('workoutRoutines') || '[]');
    const currentRoutine = storedRoutines.find(routine => routine.name === decodedRoutineName);
    if (currentRoutine && currentRoutine.exercises) {
      setExercises(currentRoutine.exercises);
    }
  }, [decodedRoutineName]);

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
        routine.name === decodedRoutineName 
          ? { ...routine, exercises: updatedExercises } 
          : routine
      );
      localStorage.setItem('workoutRoutines', JSON.stringify(updatedRoutines));
      
      handleClose();
    }
  };

  const handleDeleteRoutine = () => {
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    const storedRoutines = JSON.parse(localStorage.getItem('workoutRoutines') || '[]');
    const updatedRoutines = storedRoutines.filter(routine => routine.name !== decodedRoutineName);
    localStorage.setItem('workoutRoutines', JSON.stringify(updatedRoutines));
    setDeleteConfirmOpen(false);
    navigate('/');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {decodedRoutineName}
      </Typography>
      <List>
        {exercises.map((exercise, index) => (
          <ListItem key={index}>
            <ListItemText primary={exercise.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2, mr: 2 }}>
        Add Exercise
      </Button>
      <Button variant="contained" color="error" onClick={handleDeleteRoutine} sx={{ mt: 2 }}>
        Delete Routine
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
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Delete Routine</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this routine? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">I'm sure</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RoutineDetails;
