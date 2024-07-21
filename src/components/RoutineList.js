import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { getRoutines, addRoutine } from '../utils/db';

function RoutineList() {
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const fetchedRoutines = await getRoutines();
        setRoutines(fetchedRoutines);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      }
    };
    fetchRoutines();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoutineName('');
  };

  const handleAddRoutine = async () => {
    if (newRoutineName.trim() !== '') {
      const newRoutine = { name: newRoutineName.trim(), exercises: [] };
      try {
        await addRoutine(newRoutine);
        setRoutines([...routines, newRoutine]);
        handleClose();
      } catch (error) {
        console.error('Failed to add routine:', error);
      }
    }
  };

  const handleRoutineClick = (routineName) => {
    navigate(`/routine/${encodeURIComponent(routineName)}`);
  };

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Routines
      </Typography>
      <List>
        {routines.map((routine, index) => (
          <ListItem 
            key={index} 
            button 
            onClick={() => handleRoutineClick(routine.name)}
          >
            <ListItemText primary={routine.name} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mt: 2 }}>
        Add Routine
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Routine</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Routine Name"
            type="text"
            fullWidth
            variant="standard"
            value={newRoutineName}
            onChange={(e) => setNewRoutineName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddRoutine} data-testid="dialog-add-button">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default RoutineList;
