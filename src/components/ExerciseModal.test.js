import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExerciseModal from './ExerciseModal';
import { muscleGroupLabels } from '../constants/muscleGroups';

const mockExercise = {
  id: '1',
  name: 'Push-ups',
  description: 'Basic push-ups',
  sets: 3,
  repsPerSet: 10,
  holdTime: 0,
  bilateral: false,
  muscleGroup: 'ARMS',
};

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnClose = jest.fn();

describe('ExerciseModal', () => {
  test('renders add exercise modal correctly', () => {
    render(<ExerciseModal open={true} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Add Exercise')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Muscle Group')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Sets')).toBeInTheDocument();
    expect(screen.getByLabelText('Reps per Set')).toBeInTheDocument();
    expect(screen.getByLabelText('Hold Time (s)')).toBeInTheDocument();
    expect(screen.getByLabelText('Bilateral')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  test('renders edit exercise modal correctly', () => {
    render(<ExerciseModal open={true} exercise={mockExercise} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Edit Exercise')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveValue('Push-ups');
    expect(screen.getByLabelText('Muscle Group')).toHaveValue('ARMS');
    expect(screen.getByLabelText('Description')).toHaveValue('Basic push-ups');
    expect(screen.getByLabelText('Sets')).toHaveValue(3);
    expect(screen.getByLabelText('Reps per Set')).toHaveValue(10);
    expect(screen.getByLabelText('Hold Time (s)')).toHaveValue(0);
    expect(screen.getByLabelText('Bilateral')).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  test('calls onUpdate when form is submitted', () => {
    render(<ExerciseModal open={true} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Squats' } });
    fireEvent.change(screen.getByLabelText('Muscle Group'), { target: { value: 'LEGS' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Basic squats' } });
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Reps per Set'), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText('Hold Time (s)'), { target: { value: '2' } });
    fireEvent.click(screen.getByLabelText('Bilateral'));
    
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    
    expect(mockOnUpdate).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'Squats',
      description: 'Basic squats',
      sets: 4,
      repsPerSet: 12,
      holdTime: 2,
      bilateral: true,
      muscleGroup: 'LEGS',
    });
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<ExerciseModal open={true} exercise={mockExercise} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    
    expect(mockOnDelete).toHaveBeenCalledWith(mockExercise);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onClose when cancel button is clicked', () => {
    render(<ExerciseModal open={true} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('renders all muscle group options', () => {
    render(<ExerciseModal open={true} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    const muscleGroupSelect = screen.getByLabelText('Muscle Group');
    fireEvent.mouseDown(muscleGroupSelect);
    
    Object.values(muscleGroupLabels).forEach(label => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});
