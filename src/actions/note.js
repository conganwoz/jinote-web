import { noteConstants } from '../constants/note';

export const createTempNote = (data) => ({ type: noteConstants.createTempNote, payload: data });

export const clearCurrentNote = (data) => ({ type: noteConstants.clearCurrentNote, payload: data });
