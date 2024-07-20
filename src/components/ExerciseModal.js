import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';

function ExerciseModal({ open, onClose, exercise, onUpdate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sets, setSets] = useState(0);
  const [repsPerSet, setRepsPerSet] = useState(0);
  const [holdTime, setHoldTime] = useState(0);
  const [bilateral, setBilateral] = useState(false);

  useEffect(() => {
    if (exercise) {
      setName(exercise.name || '');
      setDescription(exercise.description || '');
      setSets(exercise.sets || 0);
      setRepsPerSet(exercise.repsPerSet || 0);
      setHoldTime(exercise.holdTime || 0);
      setBilateral(exercise.bilateral || false);
    }
  }, [exercise]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      name,
      description,
      sets,
      repsPerSet,
      holdTime,
      bilateral,
    });
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
          />
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
          <TextField
            margin="dense"
            label="Sets"
            type="number"
            fullWidth
            value={sets}
            onChange={(e) => setSets(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Reps per Set"
            type="number"
            fullWidth
            value={repsPerSet}
            onChange={(e) => setRepsPerSet(Number(e.target.value))}
          />
          <TextField
            margin="dense"
            label="Hold Time (seconds)"
            type="number"
            fullWidth
            value={holdTime}
            onChange={(e) => setHoldTime(Number(e.target.value))}
          />
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
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ExerciseModal;
