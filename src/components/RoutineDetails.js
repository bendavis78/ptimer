import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

function RoutineDetails() {
  const { routineName } = useParams();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {routineName}
      </Typography>
    </Container>
  );
}

export default RoutineDetails;
