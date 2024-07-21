import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

export const db = new Dexie('WorkoutRoutineDB');
db.version(2).stores({
  routines: '++id, name',
  exercises: 'id, name, muscleGroup'
});

db.exercises.hook('creating', function (primKey, obj) {
  if (!obj.id) obj.id = uuidv4();
});

export const getRoutines = () => db.routines.toArray();

export const addRoutine = (routine) => db.routines.add(routine);

export const updateRoutine = (id, routine) => db.routines.update(id, routine);

export const deleteRoutine = (id) => db.routines.delete(id);

export const getExercises = () => db.exercises.toArray();

export const addExercise = (exercise) => db.exercises.add(exercise);

export const updateExercise = (exercise) => db.exercises.put(exercise);

export const deleteExercise = (id) => db.exercises.delete(id);
