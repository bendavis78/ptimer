import "fake-indexeddb/auto";
import * as indexedDBModule from './indexedDB';

describe('indexedDB utility functions', () => {
  beforeEach(() => {
    // Reset the database before each test
    indexedDB.deleteDatabase("WorkoutRoutineDB");
  });

  test('getRoutines fetches all routines', async () => {
    const mockRoutines = [{ name: 'Routine 1' }, { name: 'Routine 2' }];
    await indexedDBModule.addRoutine(mockRoutines[0]);
    await indexedDBModule.addRoutine(mockRoutines[1]);

    const result = await indexedDBModule.getRoutines();
    expect(result).toEqual(mockRoutines);
  });

  test('addRoutine adds a new routine', async () => {
    const mockRoutine = { name: 'New Routine' };
    await indexedDBModule.addRoutine(mockRoutine);

    const routines = await indexedDBModule.getRoutines();
    expect(routines).toContainEqual(mockRoutine);
  });

  test('updateRoutine updates an existing routine', async () => {
    const mockRoutine = { name: 'Original Routine' };
    await indexedDBModule.addRoutine(mockRoutine);

    const updatedRoutine = { name: 'Original Routine', exercises: ['New Exercise'] };
    await indexedDBModule.updateRoutine(updatedRoutine);

    const routines = await indexedDBModule.getRoutines();
    expect(routines).toContainEqual(updatedRoutine);
  });

  test('deleteRoutine deletes a routine', async () => {
    const mockRoutine = { name: 'Routine to Delete' };
    await indexedDBModule.addRoutine(mockRoutine);

    await indexedDBModule.deleteRoutine(mockRoutine.name);

    const routines = await indexedDBModule.getRoutines();
    expect(routines).not.toContainEqual(mockRoutine);
  });

  test('getExercises fetches all exercises', async () => {
    const mockExercises = [{ id: '1', name: 'Exercise 1' }, { id: '2', name: 'Exercise 2' }];
    await indexedDBModule.addExercise(mockExercises[0]);
    await indexedDBModule.addExercise(mockExercises[1]);

    const result = await indexedDBModule.getExercises();
    expect(result).toEqual(mockExercises);
  });

  test('addExercise adds a new exercise', async () => {
    const mockExercise = { id: '3', name: 'New Exercise' };
    await indexedDBModule.addExercise(mockExercise);

    const exercises = await indexedDBModule.getExercises();
    expect(exercises).toContainEqual(mockExercise);
  });

  test('updateExercise updates an existing exercise', async () => {
    const mockExercise = { id: '1', name: 'Original Exercise' };
    await indexedDBModule.addExercise(mockExercise);

    const updatedExercise = { id: '1', name: 'Updated Exercise' };
    await indexedDBModule.updateExercise(updatedExercise);

    const exercises = await indexedDBModule.getExercises();
    expect(exercises).toContainEqual(updatedExercise);
  });

  test('deleteExercise deletes an exercise', async () => {
    const mockExercise = { id: '1', name: 'Exercise to Delete' };
    await indexedDBModule.addExercise(mockExercise);

    await indexedDBModule.deleteExercise(mockExercise.id);

    const exercises = await indexedDBModule.getExercises();
    expect(exercises).not.toContainEqual(mockExercise);
  });
});
