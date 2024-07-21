import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RoutineList from './RoutineList';
import * as db from '../utils/db';

// Mock the db functions
jest.mock('../utils/db', () => ({
  getRoutines: jest.fn(),
  addRoutine: jest.fn(),
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  );
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

test('renders Routines title', async () => {
  db.getRoutines.mockResolvedValue([]);
  renderWithRouter(<RoutineList />);
  const titleElement = await screen.findByText(/Routines/i);
  expect(titleElement).toBeInTheDocument();
});

test('opens dialog when Add Routine button is clicked', async () => {
  db.getRoutines.mockResolvedValue([]);
  renderWithRouter(<RoutineList />);
  const addButton = await screen.findByText(/Add Routine/i);
  fireEvent.click(addButton);
  const dialogTitle = await screen.findByText(/Add New Routine/i);
  expect(dialogTitle).toBeInTheDocument();
});

test('adds a new routine when form is submitted', async () => {
  db.getRoutines.mockResolvedValue([]);
  db.addRoutine.mockResolvedValue();
  renderWithRouter(<RoutineList />);
  
  const addButton = await screen.findByText(/Add Routine/i);
  fireEvent.click(addButton);
  
  const input = await screen.findByLabelText(/Routine Name/i);
  fireEvent.change(input, { target: { value: 'My New Routine' } });
  
  const submitButton = await screen.findByTestId('dialog-add-button');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(db.addRoutine).toHaveBeenCalledWith(expect.objectContaining({
      name: 'My New Routine',
      exercises: []
    }));
  });
});

test('navigates to routine details when a routine is clicked', async () => {
  const testRoutine = { name: 'Test Routine', exercises: [] };
  db.getRoutines.mockResolvedValue([testRoutine]);
  const { history } = renderWithRouter(<RoutineList />);

  const routineItem = await screen.findByText(/Test Routine/i);
  fireEvent.click(routineItem);

  await waitFor(() => {
    expect(history.location.pathname).toBe('/routine/Test%20Routine');
  });
});
