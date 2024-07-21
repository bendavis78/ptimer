import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Button
} from '@mui/material';
import ExerciseModal from './ExerciseModal';
import { getExercises, addExercise, updateExercise, deleteExercise } from '../utils/db';

function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const fetchedExercises = await getExercises();
      setExercises(fetchedExercises);
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
    }
  };

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

  const handleSaveExercise = async (exerciseData) => {
    try {
      if (selectedExercise) {
        await updateExercise(exerciseData);
      } else {
        await addExercise(exerciseData);
      }
      await fetchExercises();
      handleClose();
    } catch (error) {
      console.error('Failed to save exercise:', error);
    }
  };

  const handleDeleteExercise = async (exerciseToDelete) => {
    try {
      await deleteExercise(exerciseToDelete._id);
      await fetchExercises();
      handleClose();
    } catch (error) {
      console.error('Failed to delete exercise:', error);
    }
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Exercises
      </Typography>
      <List data-testid="exercise-list">
        {exercises.map((exercise) => (
          <ListItem key={exercise._id} button onClick={() => handleExerciseClick(exercise)} data-testid="exercise-item">
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
        onDelete={handleDeleteExercise}
      />
    </>
  );
}

export default ExerciseList;
