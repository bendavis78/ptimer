import PouchDB from 'pouchdb';
import { v4 as uuidv4 } from 'uuid';

const db = new PouchDB('workout_routine_db');

export const getRoutines = async () => {
  const result = await db.allDocs({
    include_docs: true,
    startkey: 'routine_',
    endkey: 'routine_\ufff0'
  });
  return result.rows.map(row => row.doc);
};

export const addRoutine = async (routine) => {
  routine._id = `routine_${uuidv4()}`;
  return db.put(routine);
};

export const updateRoutine = async (id, routine) => {
  const doc = await db.get(id);
  return db.put({ ...doc, ...routine });
};

export const deleteRoutine = async (id) => {
  const doc = await db.get(id);
  return db.remove(doc);
};

export const getExercises = async () => {
  const result = await db.allDocs({
    include_docs: true,
    startkey: 'exercise_',
    endkey: 'exercise_\ufff0'
  });
  return result.rows.map(row => row.doc);
};

export const addExercise = async (exercise) => {
  exercise._id = `exercise_${uuidv4()}`;
  return db.put(exercise);
};

export const updateExercise = async (exercise) => {
  const doc = await db.get(exercise._id);
  return db.put({ ...doc, ...exercise });
};

export const deleteExercise = async (id) => {
  const doc = await db.get(id);
  return db.remove(doc);
};
