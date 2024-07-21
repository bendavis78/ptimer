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
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /muscle group/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /sets/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /reps per set/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /hold time/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /bilateral/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  test('renders edit exercise modal correctly', () => {
    render(<ExerciseModal open={true} exercise={mockExercise} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    expect(screen.getByText('Edit Exercise')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue('Push-ups');
    expect(screen.getByRole('button', { name: /muscle group/i })).toHaveTextContent('Arms');
    expect(screen.getByRole('textbox', { name: /description/i })).toHaveValue('Basic push-ups');
    expect(screen.getByRole('spinbutton', { name: /sets/i })).toHaveValue(3);
    expect(screen.getByRole('spinbutton', { name: /reps per set/i })).toHaveValue(10);
    expect(screen.getByRole('spinbutton', { name: /hold time/i })).toHaveValue(0);
    expect(screen.getByRole('checkbox', { name: /bilateral/i })).not.toBeChecked();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  test('calls onUpdate when form is submitted', () => {
    render(<ExerciseModal open={true} onClose={mockOnClose} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);
    
    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), { target: { value: 'Squats' } });
    fireEvent.mouseDown(screen.getByRole('button', { name: /muscle group/i }));
    fireEvent.click(screen.getByRole('option', { name: /legs/i }));
    fireEvent.change(screen.getByRole('textbox', { name: /description/i }), { target: { value: 'Basic squats' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /sets/i }), { target: { value: '4' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /reps per set/i }), { target: { value: '12' } });
    fireEvent.change(screen.getByRole('spinbutton', { name: /hold time/i }), { target: { value: '2' } });
    fireEvent.click(screen.getByRole('checkbox', { name: /bilateral/i }));
    
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
