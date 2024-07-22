import React, { useState, useEffect } from 'react';
import { getRoutines, updateRoutine, deleteRoutine, getExercises } from '../utils/db';
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
  DialogActions
} from '@mui/material';
import ExerciseModal from './ExerciseModal';

function RoutineDetails() {
  const { routineName } = useParams();
  const navigate = useNavigate();
  const decodedRoutineName = decodeURIComponent(routineName);
  const [routine, setRoutine] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [availableExercises, setAvailableExercises] = useState([]);

  useEffect(() => {
    const fetchRoutineAndExercises = async () => {
      const routines = await getRoutines();
      const currentRoutine = routines.find(r => r.name === decodedRoutineName);
      if (currentRoutine) {
        setRoutine(currentRoutine);
        setExercises(currentRoutine.exercises || []);
      }
      const allExercises = await getExercises();
      setAvailableExercises(allExercises);
    };
    fetchRoutineAndExercises();
  }, [decodedRoutineName]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise);
    setExerciseModalOpen(true);
  };

  const handleExerciseModalClose = () => {
    setExerciseModalOpen(false);
    setSelectedExercise(null);
  };

  const handleExerciseUpdate = async (updatedExercise) => {
    const updatedExercises = exercises.map(ex => 
      ex.id === updatedExercise.id ? updatedExercise : ex
    );
    setExercises(updatedExercises);
    
    if (routine) {
      const updatedRoutine = { ...routine, exercises: updatedExercises };
      await updateRoutine(routine.id, updatedRoutine);
      setRoutine(updatedRoutine);
    }
    
    handleExerciseModalClose();
  };

  const handleAddExercise = async (exerciseToAdd) => {
    if (routine) {
      const exerciseWithId = { ...exerciseToAdd, _id: exerciseToAdd._id || `temp_${Date.now()}` };
      const updatedExercises = [...exercises, exerciseWithId];
      const updatedRoutine = { ...routine, exercises: updatedExercises };
      await updateRoutine(routine._id, updatedRoutine);
      setRoutine(updatedRoutine);
      setExercises(updatedExercises);
    }
    handleClose();
  };

  const handleDeleteRoutine = () => {
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (routine) {
      await deleteRoutine(routine.id);
      setDeleteConfirmOpen(false);
      navigate('/');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {decodedRoutineName}
      </Typography>
      <List>
        {exercises.map((exercise, index) => (
          <ListItem key={index} button onClick={() => handleExerciseClick(exercise)}>
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
        <DialogTitle>Add Exercise to Routine</DialogTitle>
        <DialogContent>
          <List>
            {availableExercises.map((exercise) => (
              <ListItem key={exercise.id} button onClick={() => handleAddExercise(exercise)}>
                <ListItemText primary={exercise.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
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
      <ExerciseModal
        open={exerciseModalOpen}
        onClose={handleExerciseModalClose}
        exercise={selectedExercise}
        onUpdate={handleExerciseUpdate}
      />
    </Container>
  );
}

export default RoutineDetails;
