import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import RoutineList from './components/RoutineList';
import RoutineDetails from './components/RoutineDetails';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<RoutineList />} />
          <Route path="/routine/:routineName" element={<RoutineDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
