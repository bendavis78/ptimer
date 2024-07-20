import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import RoutineList from './RoutineList';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

test('renders Workout Routines title', () => {
  renderWithRouter(<RoutineList />);
  const titleElement = screen.getByText(/Workout Routines/i);
  expect(titleElement).toBeInTheDocument();
});

test('opens dialog when Add Routine button is clicked', () => {
  renderWithRouter(<RoutineList />);
  const addButton = screen.getByText(/Add Routine/i);
  fireEvent.click(addButton);
  const dialogTitle = screen.getByText(/Add New Routine/i);
  expect(dialogTitle).toBeInTheDocument();
});

test('adds a new routine when form is submitted', () => {
  renderWithRouter(<RoutineList />);
  const addButton = screen.getByText(/Add Routine/i);
  fireEvent.click(addButton);
  
  const input = screen.getByLabelText(/Routine Name/i);
  fireEvent.change(input, { target: { value: 'My New Routine' } });
  
  const submitButton = screen.getByTestId('dialog-add-button');
  fireEvent.click(submitButton);

  const newRoutine = screen.getByText(/My New Routine/i);
  expect(newRoutine).toBeInTheDocument();
});

test('navigates to routine details when a routine is clicked', () => {
  renderWithRouter(<RoutineList />);
  const addButton = screen.getByText(/Add Routine/i);
  fireEvent.click(addButton);
  
  const input = screen.getByLabelText(/Routine Name/i);
  fireEvent.change(input, { target: { value: 'Test Routine' } });
  
  const submitButton = screen.getByTestId('dialog-add-button');
  fireEvent.click(submitButton);

  const routineItem = screen.getByText(/Test Routine/i);
  fireEvent.click(routineItem);

  expect(window.location.pathname).toBe('/routine/Test%20Routine');
});
