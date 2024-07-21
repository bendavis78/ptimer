const DB_NAME = 'WorkoutRoutineDB';
const DB_VERSION = 1;
const ROUTINE_STORE = 'routines';
const EXERCISE_STORE = 'exercises';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(ROUTINE_STORE)) {
        db.createObjectStore(ROUTINE_STORE, { keyPath: 'name' });
      }
      if (!db.objectStoreNames.contains(EXERCISE_STORE)) {
        db.createObjectStore(EXERCISE_STORE, { keyPath: 'id' });
      }
    };
  });
};

export const getRoutines = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ROUTINE_STORE, 'readonly');
    const store = transaction.objectStore(ROUTINE_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const addRoutine = async (routine) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ROUTINE_STORE, 'readwrite');
    const store = transaction.objectStore(ROUTINE_STORE);
    const request = store.add(routine);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const updateRoutine = async (routine) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ROUTINE_STORE, 'readwrite');
    const store = transaction.objectStore(ROUTINE_STORE);
    const request = store.put(routine);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const deleteRoutine = async (routineName) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(ROUTINE_STORE, 'readwrite');
    const store = transaction.objectStore(ROUTINE_STORE);
    const request = store.delete(routineName);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const getExercises = async () => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readonly');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const addExercise = async (exercise) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.add(exercise);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
};

export const updateExercise = async (exercise) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.put(exercise);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(exercise);
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};

export const deleteExercise = async (exerciseId) => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(EXERCISE_STORE, 'readwrite');
    const store = transaction.objectStore(EXERCISE_STORE);
    const request = store.delete(exerciseId);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve();
    };

    transaction.oncomplete = () => {
      db.close();
    };

    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
  });
};
