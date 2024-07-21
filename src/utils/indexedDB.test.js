import * as indexedDB from './indexedDB';

// Mock indexedDB
const indexedDBMock = {
  open: jest.fn(),
};

const dbMock = {
  transaction: jest.fn(),
  objectStore: jest.fn(),
  add: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(),
};

global.indexedDB = indexedDBMock;

describe('indexedDB utility functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    indexedDBMock.open.mockReturnValue({
      result: dbMock,
      onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
    });
  });

  test('getRoutines fetches all routines', async () => {
    const mockRoutines = [{ name: 'Routine 1' }, { name: 'Routine 2' }];
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        getAll: jest.fn().mockReturnValue({
          result: mockRoutines,
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    const result = await indexedDB.getRoutines();
    expect(result).toEqual(mockRoutines);
  });

  test('addRoutine adds a new routine', async () => {
    const mockRoutine = { name: 'New Routine' };
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        add: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.addRoutine(mockRoutine);
    expect(dbMock.transaction().objectStore().add).toHaveBeenCalledWith(mockRoutine);
  });

  test('updateRoutine updates an existing routine', async () => {
    const mockRoutine = { name: 'Updated Routine' };
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        put: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.updateRoutine(mockRoutine);
    expect(dbMock.transaction().objectStore().put).toHaveBeenCalledWith(mockRoutine);
  });

  test('deleteRoutine deletes a routine', async () => {
    const routineName = 'Routine to Delete';
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        delete: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.deleteRoutine(routineName);
    expect(dbMock.transaction().objectStore().delete).toHaveBeenCalledWith(routineName);
  });

  test('getExercises fetches all exercises', async () => {
    const mockExercises = [{ id: '1', name: 'Exercise 1' }, { id: '2', name: 'Exercise 2' }];
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        getAll: jest.fn().mockReturnValue({
          result: mockExercises,
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    const result = await indexedDB.getExercises();
    expect(result).toEqual(mockExercises);
  });

  test('addExercise adds a new exercise', async () => {
    const mockExercise = { id: '3', name: 'New Exercise' };
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        add: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.addExercise(mockExercise);
    expect(dbMock.transaction().objectStore().add).toHaveBeenCalledWith(mockExercise);
  });

  test('updateExercise updates an existing exercise', async () => {
    const mockExercise = { id: '1', name: 'Updated Exercise' };
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        put: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.updateExercise(mockExercise);
    expect(dbMock.transaction().objectStore().put).toHaveBeenCalledWith(mockExercise);
  });

  test('deleteExercise deletes an exercise', async () => {
    const exerciseId = '1';
    dbMock.transaction.mockReturnValue({
      objectStore: jest.fn().mockReturnValue({
        delete: jest.fn().mockReturnValue({
          result: 'success',
          onsuccess: jest.fn().mockImplementation(function() { this.onsuccess(); }),
        }),
      }),
    });

    await indexedDB.deleteExercise(exerciseId);
    expect(dbMock.transaction().objectStore().delete).toHaveBeenCalledWith(exerciseId);
  });
});
