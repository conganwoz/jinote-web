import { noteConstants } from '../constants/note';

export const createTempNote = (data) => ({ type: noteConstants.createTempNote, payload: data });

export const clearCurrentNote = (data) => ({ type: noteConstants.clearCurrentNote, payload: data });

export const fetchNotesFromLocal = (data) => ({
  type: noteConstants.fetchNotesFromLocal,
  payload: data
});

export const saveNote = (data) => ({
  type: noteConstants.saveNote,
  payload: data
});
