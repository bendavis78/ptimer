import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import RoutineList from './RoutineList';
import * as indexedDB from '../utils/indexedDB';

// Mock the indexedDB functions
jest.mock('../utils/indexedDB', () => ({
  getRoutines: jest.fn(),
  addRoutine: jest.fn(),
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

test('renders Routines title', async () => {
  indexedDB.getRoutines.mockResolvedValue([]);
  renderWithRouter(<RoutineList />);
  const titleElement = await screen.findByText(/Routines/i);
  expect(titleElement).toBeInTheDocument();
});

test('opens dialog when Add Routine button is clicked', async () => {
  indexedDB.getRoutines.mockResolvedValue([]);
  renderWithRouter(<RoutineList />);
  const addButton = await screen.findByText(/Add Routine/i);
  fireEvent.click(addButton);
  const dialogTitle = await screen.findByText(/Add New Routine/i);
  expect(dialogTitle).toBeInTheDocument();
});

test('adds a new routine when form is submitted', async () => {
  indexedDB.getRoutines.mockResolvedValue([]);
  indexedDB.addRoutine.mockResolvedValue();
  renderWithRouter(<RoutineList />);
  
  const addButton = await screen.findByText(/Add Routine/i);
  fireEvent.click(addButton);
  
  const input = await screen.findByLabelText(/Routine Name/i);
  fireEvent.change(input, { target: { value: 'My New Routine' } });
  
  const submitButton = await screen.findByTestId('dialog-add-button');
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(indexedDB.addRoutine).toHaveBeenCalledWith(expect.objectContaining({
      name: 'My New Routine',
      exercises: []
    }));
  });
});

test('navigates to routine details when a routine is clicked', async () => {
  const testRoutine = { name: 'Test Routine', exercises: [] };
  indexedDB.getRoutines.mockResolvedValue([testRoutine]);
  renderWithRouter(<RoutineList />);

  const routineItem = await screen.findByText(/Test Routine/i);
  fireEvent.click(routineItem);

  expect(window.location.pathname).toBe('/routine/Test%20Routine');
});
