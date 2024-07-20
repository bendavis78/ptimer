import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoutineList from './RoutineList';

test('renders Workout Routines title', () => {
  render(<RoutineList />);
  const titleElement = screen.getByText(/Workout Routines/i);
  expect(titleElement).toBeInTheDocument();
});

test('opens dialog when Add Routine button is clicked', () => {
  render(<RoutineList />);
  const addButton = screen.getByText(/Add Routine/i);
  fireEvent.click(addButton);
  const dialogTitle = screen.getByText(/Add New Routine/i);
  expect(dialogTitle).toBeInTheDocument();
});

test('adds a new routine when form is submitted', () => {
  render(<RoutineList />);
  const addButton = screen.getByText(/Add Routine/i);
  fireEvent.click(addButton);
  
  const input = screen.getByLabelText(/Routine Name/i);
  fireEvent.change(input, { target: { value: 'My New Routine' } });
  
  const submitButton = screen.getByTestId('dialog-add-button');
  fireEvent.click(submitButton);

  const newRoutine = screen.getByText(/My New Routine/i);
  expect(newRoutine).toBeInTheDocument();
});
