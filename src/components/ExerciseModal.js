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
} from '@mui/material';

function ExerciseModal({ open, onClose, exercise, onUpdate, onDelete }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState(0);
  const [repsPerSet, setRepsPerSet] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [bilateral, setBilateral] = useState(false);
  const [muscleGroup, setMuscleGroup] = useState('');

  const resetForm = useCallback(() => {
    setName('');
    setDescription('');
    setSets(0);
    setRepsPerSet(0);
    setHoldTime(0);
    setBilateral(false);
    setMuscleGroup('');
  }, []);

  useEffect(() => {
    if (open) {
      if (exercise) {
        setName(exercise.name || '');
        setDescription(exercise.description || '');
        setSets(exercise.sets || 0);
        setRepsPerSet(exercise.repsPerSet || 0);
        setHoldTime(exercise.holdTime || 0);
        setBilateral(exercise.bilateral || false);
        setMuscleGroup(exercise.muscleGroup || '');
      } else {
        resetForm();
      }
    }
  }, [open, exercise, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      name,
      description,
      sets,
      repsPerSet,
      holdTime,
      bilateral,
      muscleGroup,
    });
  };

  const handleDelete = () => {
    onDelete(exercise);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{exercise ? 'Edit Exercise' : 'Add Exercise'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
            <Select
              labelId="muscle-group-label"
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              label="Muscle Group"
            >
              <MenuItem value="Neck & shoulders">Neck & shoulders</MenuItem>
              <MenuItem value="Back">Back</MenuItem>
              <MenuItem value="Arms">Arms</MenuItem>
              <MenuItem value="Abdominal">Abdominal</MenuItem>
              <MenuItem value="Legs">Legs</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <TextField
              margin="dense"
              label="Sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <TextField
              margin="dense"
              label="Reps per Set"
              type="number"
              value={repsPerSet}
              onChange={(e) => setRepsPerSet(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <TextField
              margin="dense"
              label="Hold Time (s)"
              type="number"
              value={holdTime}
              onChange={(e) => setHoldTime(Number(e.target.value))}
              style={{ flex: 1 }}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={bilateral}
                onChange={(e) => setBilateral(e.target.checked)}
              />
            }
            label="Bilateral"
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between' }}>
          <Button 
            onClick={handleDelete} 
            color="error" 
            sx={{ visibility: exercise ? 'visible' : 'hidden' }}
          >
            Delete
          </Button>
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
