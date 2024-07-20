import React, { useState, useEffect } from 'react';
import { 
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

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState('');

  useEffect(() => {
    const storedExercises = localStorage.getItem('exercises');
    if (storedExercises) {
      setExercises(JSON.parse(storedExercises));
    }
  }, []);

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
      localStorage.setItem('exercises', JSON.stringify(updatedExercises));
      handleClose();
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Exercises
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
          <Button onClick={handleAddExercise}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ExerciseList;
