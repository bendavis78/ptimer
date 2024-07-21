import "fake-indexeddb/auto";
import * as indexedDB from './indexedDB';

describe('indexedDB utility functions', () => {
  beforeEach(() => {
    // Reset the database before each test
    indexedDB.deleteDatabase("WorkoutRoutineDB");
  });

  test('getRoutines fetches all routines', async () => {
    const mockRoutines = [{ name: 'Routine 1' }, { name: 'Routine 2' }];
    await indexedDB.addRoutine(mockRoutines[0]);
    await indexedDB.addRoutine(mockRoutines[1]);

    const result = await indexedDB.getRoutines();
    expect(result).toEqual(mockRoutines);
  });

  test('addRoutine adds a new routine', async () => {
    const mockRoutine = { name: 'New Routine' };
    await indexedDB.addRoutine(mockRoutine);

    const routines = await indexedDB.getRoutines();
    expect(routines).toContainEqual(mockRoutine);
  });

  test('updateRoutine updates an existing routine', async () => {
    const mockRoutine = { name: 'Original Routine' };
    await indexedDB.addRoutine(mockRoutine);

    const updatedRoutine = { name: 'Original Routine', exercises: ['New Exercise'] };
    await indexedDB.updateRoutine(updatedRoutine);

    const routines = await indexedDB.getRoutines();
    expect(routines).toContainEqual(updatedRoutine);
  });

  test('deleteRoutine deletes a routine', async () => {
    const mockRoutine = { name: 'Routine to Delete' };
    await indexedDB.addRoutine(mockRoutine);

    await indexedDB.deleteRoutine(mockRoutine.name);

    const routines = await indexedDB.getRoutines();
    expect(routines).not.toContainEqual(mockRoutine);
  });

  test('getExercises fetches all exercises', async () => {
    const mockExercises = [{ id: '1', name: 'Exercise 1' }, { id: '2', name: 'Exercise 2' }];
    await indexedDB.addExercise(mockExercises[0]);
    await indexedDB.addExercise(mockExercises[1]);

    const result = await indexedDB.getExercises();
    expect(result).toEqual(mockExercises);
  });

  test('addExercise adds a new exercise', async () => {
    const mockExercise = { id: '3', name: 'New Exercise' };
    await indexedDB.addExercise(mockExercise);

    const exercises = await indexedDB.getExercises();
    expect(exercises).toContainEqual(mockExercise);
  });

  test('updateExercise updates an existing exercise', async () => {
    const mockExercise = { id: '1', name: 'Original Exercise' };
    await indexedDB.addExercise(mockExercise);

    const updatedExercise = { id: '1', name: 'Updated Exercise' };
    await indexedDB.updateExercise(updatedExercise);

    const exercises = await indexedDB.getExercises();
    expect(exercises).toContainEqual(updatedExercise);
  });

  test('deleteExercise deletes an exercise', async () => {
    const mockExercise = { id: '1', name: 'Exercise to Delete' };
    await indexedDB.addExercise(mockExercise);

    await indexedDB.deleteExercise(mockExercise.id);

    const exercises = await indexedDB.getExercises();
    expect(exercises).not.toContainEqual(mockExercise);
  });
});
