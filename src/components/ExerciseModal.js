import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import {
  muscleGroupLabels,
} from '../constants/muscleGroups';

function ExerciseModal({ open, onClose, exercise, onUpdate, onDelete, isRoutineExercise = false }) {
  const [localExercise, setLocalExercise] = useState({
    id: '',
    name: '',
    description: '',
    sets: '',
    repsPerSet: '',
    holdTime: '',
    bilateral: false,
    muscleGroup: '',
  });

  useEffect(() => {
    if (open && exercise) {
      setLocalExercise({
        id: exercise.id || '',
        name: exercise.name || '',
        description: exercise.description || '',
        sets: exercise.sets?.toString() || '',
        repsPerSet: exercise.repsPerSet?.toString() || '',
        holdTime: exercise.holdTime?.toString() || '',
        bilateral: exercise.bilateral || false,
        muscleGroup: exercise.muscleGroup || '',
      });
    } else {
      setLocalExercise({
        id: '',
        name: '',
        description: '',
        sets: '',
        repsPerSet: '',
        holdTime: '',
        bilateral: false,
        muscleGroup: '',
      });
    }
  }, [open, exercise]);

  useEffect(() => {
    if (open && exercise) {
      setLocalExercise(prevState => ({
        ...prevState,
        muscleGroup: exercise.muscleGroup || '',
      }));
    }
  }, [open, exercise]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalExercise(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...localExercise,
      sets: parseInt(localExercise.sets, 10) || 0,
      repsPerSet: parseInt(localExercise.repsPerSet, 10) || 0,
      holdTime: parseInt(localExercise.holdTime, 10) || 0,
    });
  };

  const handleDelete = () => {
    onDelete(exercise);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isRoutineExercise ? 'Exercise Details' : (exercise ? 'Edit Exercise' : 'Add Exercise')}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {isRoutineExercise ? (
            <>
              <Typography variant="h6">{localExercise.name}</Typography>
              <Typography variant="body1">{localExercise.description}</Typography>
              <Typography variant="body2">Muscle Group: {muscleGroupLabels[localExercise.muscleGroup]}</Typography>
            </>
          ) : (
            <>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                fullWidth
                value={localExercise.name}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth margin="dense">
                <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
                <Select
                  labelId="muscle-group-label"
                  name="muscleGroup"
                  value={localExercise.muscleGroup}
                  onChange={handleChange}
                  label="Muscle Group"
                >
                  {Object.entries(muscleGroupLabels).map(([value, label]) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                margin="dense"
                name="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                rows={4}
                value={localExercise.description}
                onChange={handleChange}
              />
            </>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <TextField
              margin="dense"
              name="sets"
              label="Sets"
              type="number"
              value={localExercise.sets}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
            <TextField
              margin="dense"
              name="repsPerSet"
              label="Reps per Set"
              type="number"
              value={localExercise.repsPerSet}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
            <TextField
              margin="dense"
              name="holdTime"
              label="Hold Time (s)"
              type="number"
              value={localExercise.holdTime}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                name="bilateral"
                checked={localExercise.bilateral}
                onChange={handleChange}
              />
            }
            label="Bilateral"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          {exercise && !isRoutineExercise && (
            <Button 
              onClick={handleDelete} 
              color="error"
            >
              Delete
            </Button>
          )}
          {isRoutineExercise && (
            <Button 
              onClick={handleDelete} 
              color="error"
            >
              Remove from Routine
            </Button>
          )}
          <div>
            <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
            <Button type="submit">{exercise ? 'Save' : 'Add'}</Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ExerciseModal;
