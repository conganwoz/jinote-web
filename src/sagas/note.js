import { call, put, takeEvery } from 'redux-saga/effects';

import { noteConstants } from '../constants/note';
import { db } from '../database/db';

export default [requestNote];

function* startRequest(payload) {
  switch (payload.type) {
    case noteConstants.saveNote: {
      yield call(saveNote, payload);
      break;
    }

    default:
      break;
  }
}

function* saveNote({ payload }) {
  const { note } = payload;
  try {
    yield call(saveDataToStorage, 'notes', note);

    yield put({ type: noteConstants.saveNoteSuccess, newNote: note });

    return note;
  } catch (error) {
    console.log(error);
    yield put({ type: noteConstants.saveNoteError, error });
    return error;
  }
}

async function saveDataToStorage(key, value) {
  if (!value?.id) {
    await db?.[key]?.add(value);
  } else {
    await db?.[key]?.update(value?.id, value);
  }
  return value;
}

export function* requestNote() {
  yield takeEvery(
    [noteConstants.createTempNote, noteConstants.clearCurrentNote, noteConstants.saveNote],
    startRequest
  );
}
