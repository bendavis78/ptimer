import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';
// Import fake-indexeddb before our db module
import 'fake-indexeddb/auto';

import { db } from '../utils/db';

const renderWithRouter = (ui, { route = '/routine/Test%20Routine' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/routine/:routineName" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(async () => {
  // Clear the database before each test
  await db.delete();
  await db.open();

  // Add a test routine
  await db.routines.add({ name: 'Test Routine', exercises: [] });
});

afterAll(async () => {
  // Clean up after all tests
  await db.close();
});

test('renders routine name', async () => {
  renderWithRouter(<RoutineDetails />);
  await waitFor(() => {
    const routineNameHeading = screen.getByText('Test Routine');
    expect(routineNameHeading).toBeInTheDocument();
  });
});

test('displays empty exercise list', async () => {
  renderWithRouter(<RoutineDetails />);
  await waitFor(() => {
    const exerciseList = screen.queryAllByRole('listitem');
    expect(exerciseList).toHaveLength(0);
  });
});

test('adds a new exercise', async () => {
  renderWithRouter(<RoutineDetails />);
  
  await waitFor(() => {
    const addExerciseButton = screen.getByText(/Add Exercise/i);
    fireEvent.click(addExerciseButton);
  });

  const exerciseInput = await screen.findByLabelText(/Exercise Name/i);
  fireEvent.change(exerciseInput, { target: { value: 'Push-ups' } });

  const addExerciseDialogButton = await screen.findByTestId('dialog-add-exercise-button');
  fireEvent.click(addExerciseDialogButton);

  await waitFor(() => {
    const newExercise = screen.getByText(/Push-ups/i);
    expect(newExercise).toBeInTheDocument();
  });
});
