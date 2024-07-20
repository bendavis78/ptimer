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
    } else {
      setName('');
      setDescription('');
      setSets(0);
      setRepsPerSet(0);
      setHoldTime(0);
      setBilateral(false);
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
            required
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
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">{exercise ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default ExerciseModal;
