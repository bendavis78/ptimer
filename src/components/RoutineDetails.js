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
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function RoutineDetails() {
  const { routineName } = useParams();
  const navigate = useNavigate();
  const decodedRoutineName = decodeURIComponent(routineName);
  const [routine, setRoutine] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
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

  const handleAddExercise = async (exerciseToAdd) => {
    if (routine) {
      const exerciseWithId = { 
        ...exerciseToAdd, 
        _id: exerciseToAdd._id // Use the existing _id from the exercise
      };
      try {
        const updatedRoutine = await updateRoutine(routine._id, {
          exercises: [...routine.exercises, exerciseWithId]
        });
        setRoutine(updatedRoutine);
        setExercises(updatedRoutine.exercises);
      } catch (error) {
        console.error('Failed to add exercise to routine:', error);
        // You might want to show an error message to the user here
      }
    }
    handleClose();
  };

  const handleDeleteRoutine = () => {
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (routine) {
      await deleteRoutine(routine._id);
      setDeleteConfirmOpen(false);
      navigate('/');
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(exercises);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExercises(items);

    if (routine) {
      const updatedRoutine = { ...routine, exercises: items };
      await updateRoutine(routine._id, updatedRoutine);
      setRoutine(updatedRoutine);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {decodedRoutineName}
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="exercises">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {exercises.map((exercise, index) => (
                <Draggable key={exercise._id} draggableId={exercise._id} index={index}>
                  {(provided) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItemText primary={exercise.name} />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
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
              <ListItem key={exercise._id} button onClick={() => handleAddExercise(exercise)}>
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
    </Container>
  );
}

export default RoutineDetails;
