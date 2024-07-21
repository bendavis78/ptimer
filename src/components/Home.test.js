import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Mock the child components
jest.mock('./RoutineList', () => () => <div data-testid="routine-list">Mocked RoutineList</div>);
jest.mock('./ExerciseList', () => () => <div data-testid="exercise-list">Mocked ExerciseList</div>);

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Home component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test('renders Home component with tabs', () => {
    renderWithRouter(<Home />);
    expect(screen.getByRole('tab', { name: /routines/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /exercises/i })).toBeInTheDocument();
  });

  test('displays RoutineList by default', () => {
    renderWithRouter(<Home />);
    expect(screen.getByTestId('routine-list')).toBeInTheDocument();
    expect(screen.queryByTestId('exercise-list')).not.toBeInTheDocument();
  });

  test('switches to ExerciseList when Exercises tab is clicked', () => {
    renderWithRouter(<Home />);
    fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));
    expect(screen.getByTestId('exercise-list')).toBeInTheDocument();
    expect(screen.queryByTestId('routine-list')).not.toBeInTheDocument();
  });

  test('persists tab selection in localStorage', () => {
    renderWithRouter(<Home />);
    fireEvent.click(screen.getByRole('tab', { name: /exercises/i }));
    expect(localStorage.getItem('selectedTab')).toBe('1');

    // Unmount and remount component
    const { unmount } = renderWithRouter(<Home />);
    unmount();
    renderWithRouter(<Home />);

    // Check if ExerciseList is still displayed
    expect(screen.getByTestId('exercise-list')).toBeInTheDocument();
  });
});
