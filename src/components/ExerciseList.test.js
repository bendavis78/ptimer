import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseList from './ExerciseList';
import * as db from '../utils/db';

// Mock the db functions
jest.mock('../utils/db', () => ({
  getExercises: jest.fn(),
  addExercise: jest.fn(),
  updateExercise: jest.fn(),
  deleteExercise: jest.fn(),
}));

beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});

test('renders Exercises title', async () => {
  db.getExercises.mockResolvedValue([]);
  render(<ExerciseList />);
  const titleElement = await screen.findByText(/Exercises/i);
  expect(titleElement).toBeInTheDocument();
});

test('displays exercises from IndexedDB', async () => {
  const mockExercises = [
    { id: '1', name: 'Push-ups' },
    { id: '2', name: 'Squats' },
  ];
  db.getExercises.mockResolvedValue(mockExercises);

  render(<ExerciseList />);

  await waitFor(() => {
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });
});

test('opens modal when Add Exercise button is clicked', async () => {
  indexedDB.getExercises.mockResolvedValue([]);
  render(<ExerciseList />);

  const addButton = await screen.findByText(/Add Exercise/i);
  fireEvent.click(addButton);

  const modalTitle = await screen.findByRole('heading', { name: /Add Exercise/i });
  expect(modalTitle).toBeInTheDocument();
});

test('adds a new exercise', async () => {
  db.getExercises.mockResolvedValue([]);
  db.addExercise.mockResolvedValue();

  render(<ExerciseList />);

  const addButton = await screen.findByText(/Add Exercise/i);
  fireEvent.click(addButton);

  const nameInput = await screen.findByLabelText(/Name/i);
  fireEvent.change(nameInput, { target: { value: 'New Exercise' } });

  const saveButton = await screen.findByRole('button', { name: /Add/i });
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(db.addExercise).toHaveBeenCalledWith(expect.objectContaining({
      name: 'New Exercise',
    }));
  });
});

test('opens modal with exercise data when exercise is clicked', async () => {
  const mockExercise = { id: '1', name: 'Push-ups', description: 'Basic push-ups' };
  db.getExercises.mockResolvedValue([mockExercise]);

  render(<ExerciseList />);

  const exerciseItem = await screen.findByText('Push-ups');
  fireEvent.click(exerciseItem);

  await waitFor(() => {
    expect(screen.getByLabelText(/Name/i)).toHaveValue('Push-ups');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('Basic push-ups');
  });
});

test('updates an existing exercise', async () => {
  const mockExercise = { id: '1', name: 'Push-ups', description: 'Basic push-ups' };
  db.getExercises.mockResolvedValue([mockExercise]);
  db.updateExercise.mockResolvedValue();

  render(<ExerciseList />);

  const exerciseItem = await screen.findByText('Push-ups');
  fireEvent.click(exerciseItem);

  const nameInput = await screen.findByLabelText(/Name/i);
  fireEvent.change(nameInput, { target: { value: 'Advanced Push-ups' } });

  const saveButton = await screen.findByRole('button', { name: /Save/i });
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(db.updateExercise).toHaveBeenCalledWith('1', expect.objectContaining({
      id: '1',
      name: 'Advanced Push-ups',
    }));
  });
});

test('deletes an existing exercise', async () => {
  const mockExercise = { id: '1', name: 'Push-ups' };
  db.getExercises.mockResolvedValue([mockExercise]);
  db.deleteExercise.mockResolvedValue();

  render(<ExerciseList />);

  const exerciseItem = await screen.findByText('Push-ups');
  fireEvent.click(exerciseItem);

  const deleteButton = await screen.findByRole('button', { name: /Delete/i });
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(db.deleteExercise).toHaveBeenCalledWith('1');
  });
});
