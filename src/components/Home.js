import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import RoutineList from './RoutineList';
import ExerciseList from './ExerciseList';

function Home() {
  const [tabValue, setTabValue] = useState(() => {
    const savedTab = localStorage.getItem('selectedTab');
    return savedTab !== null ? parseInt(savedTab, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('selectedTab', tabValue.toString());
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Routines" />
        <Tab label="Exercises" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabValue === 0 && <RoutineList />}
        {tabValue === 1 && <ExerciseList />}
      </Box>
    </Container>
  );
}

export default Home;
