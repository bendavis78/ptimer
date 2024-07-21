import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RoutineDetails from './RoutineDetails';
import * as db from '../utils/db';

// Mock the db functions
jest.mock('../utils/db', () => ({
  getRoutines: jest.fn(),
  updateRoutine: jest.fn(),
  deleteRoutine: jest.fn(),
  getExercises: jest.fn(),
}));

const renderWithRouter = (ui, { route = '/routine/Test%20Routine' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/routine/:routineName" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('RoutineDetails', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.resetAllMocks();

    // Mock the getRoutines function to return a test routine
    db.getRoutines.mockResolvedValue([
      { id: 'test-id-1', name: 'Test Routine', exercises: [] }
    ]);

    // Mock the getExercises function to return an empty array
    db.getExercises.mockResolvedValue([]);
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

  test('opens add exercise dialog', async () => {
    renderWithRouter(<RoutineDetails />);
    
    await waitFor(() => {
      const addExerciseButton = screen.getByText(/Add Exercise/i);
      fireEvent.click(addExerciseButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Add Exercise to Routine')).toBeInTheDocument();
    });
  });
});
