import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';

const renderWithRouter = (ui, { route = '/routine/Test%20Routine' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/routine/:routineName" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('workoutRoutines', JSON.stringify([
    { name: 'Test Routine', exercises: [] }
  ]));
});

test('renders routine name', () => {
  renderWithRouter(<RoutineDetails />);
  const routineNameHeading = screen.getByText('Test Routine');
  expect(routineNameHeading).toBeInTheDocument();
});

test('displays empty exercise list', () => {
  renderWithRouter(<RoutineDetails />);
  const exerciseList = screen.queryAllByRole('listitem');
  expect(exerciseList).toHaveLength(0);
});

test('adds a new exercise', async () => {
  renderWithRouter(<RoutineDetails />);
  const addExerciseButton = screen.getByText(/Add Exercise/i);
  fireEvent.click(addExerciseButton);

  const exerciseInput = screen.getByLabelText(/Exercise Name/i);
  fireEvent.change(exerciseInput, { target: { value: 'Push-ups' } });

  const addExerciseDialogButton = screen.getByTestId('dialog-add-exercise-button');
  await act(async () => {
    fireEvent.click(addExerciseDialogButton);
  });

  const newExercise = screen.getByText(/Push-ups/i);
  expect(newExercise).toBeInTheDocument();
});
