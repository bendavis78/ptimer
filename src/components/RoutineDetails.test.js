import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';
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

test('renders routine name', async () => {
  await act(async () => {
    renderWithRouter(<RoutineDetails />);
  });
  const routineNameHeading = screen.getByText('Test Routine');
  expect(routineNameHeading).toBeInTheDocument();
});

test('displays empty exercise list', async () => {
  await act(async () => {
    renderWithRouter(<RoutineDetails />);
  });
  const exerciseList = screen.queryAllByRole('listitem');
  expect(exerciseList).toHaveLength(0);
});

test('adds a new exercise', async () => {
  await act(async () => {
    renderWithRouter(<RoutineDetails />);
  });
  
  const addExerciseButton = screen.getByText(/Add Exercise/i);
  fireEvent.click(addExerciseButton);

  const exerciseInput = screen.getByLabelText(/Exercise Name/i);
  fireEvent.change(exerciseInput, { target: { value: 'Push-ups' } });

  const addExerciseDialogButton = screen.getByTestId('dialog-add-exercise-button');
  await act(async () => {
    fireEvent.click(addExerciseDialogButton);
  });

  const newExercise = await screen.findByText(/Push-ups/i);
  expect(newExercise).toBeInTheDocument();
});
