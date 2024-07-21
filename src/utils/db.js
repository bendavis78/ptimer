import Dexie from 'dexie';

export const db = new Dexie('WorkoutRoutineDB');
db.version(1).stores({
  routines: '++id, name',
  exercises: '++id, name, muscleGroup'
});

export const getRoutines = () => db.routines.toArray();

export const addRoutine = (routine) => db.routines.add(routine);

export const updateRoutine = (id, routine) => db.routines.update(id, routine);

export const deleteRoutine = (id) => db.routines.delete(id);

export const getExercises = () => db.exercises.toArray();

export const addExercise = (exercise) => db.exercises.add(exercise);

export const updateExercise = (id, exercise) => db.exercises.update(id, exercise);

export const deleteExercise = (id) => db.exercises.delete(id);
