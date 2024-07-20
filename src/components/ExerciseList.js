import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Button
} from '@mui/material';
import ExerciseModal from './ExerciseModal';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    const storedExercises = localStorage.getItem('exercises');
    if (storedExercises) {
      setExercises(JSON.parse(storedExercises));
    }
  }, []);

  const handleClickOpen = () => {
    setSelectedExercise(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedExercise(null);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setOpen(true);
  };

  const handleSaveExercise = (exerciseData) => {
    let updatedExercises;
    if (selectedExercise) {
      // Update existing exercise
      updatedExercises = exercises.map(ex => 
        ex.name === selectedExercise.name ? exerciseData : ex
      );
    } else {
      // Add new exercise
      updatedExercises = [...exercises, exerciseData];
    }
    setExercises(updatedExercises);
    localStorage.setItem('exercises', JSON.stringify(updatedExercises));
    handleClose();
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Exercises
      </Typography>
      <List>
        {exercises.map((exercise, index) => (
          <ListItem key={index} button onClick={() => handleExerciseClick(exercise)}>
            <ListItemText primary={exercise.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2 }}>
        Add Exercise
      </Button>
      <ExerciseModal
        open={open}
        onClose={handleClose}
        exercise={selectedExercise}
        onUpdate={handleSaveExercise}
      />
    </>
  );
}

export default ExerciseList;
