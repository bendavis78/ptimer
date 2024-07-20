import React, { useState } from 'react';
import { 
  Container, 
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

function RoutineList() {
  const [routines, setRoutines] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewRoutineName('');
  };

  const handleAddRoutine = () => {
    if (newRoutineName.trim() !== '') {
      setRoutines([...routines, { name: newRoutineName.trim() }]);
      handleClose();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Workout Routines
      </Typography>
      <List>
        {routines.map((routine, index) => (
          <ListItem key={index}>
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
          <Button onClick={handleAddRoutine}>Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RoutineList;
