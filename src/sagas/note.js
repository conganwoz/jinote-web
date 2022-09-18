import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import { getLatestNotes } from '../utils/database';
import { noteConstants } from '../constants/note';
import { db } from '../database/db';

export default [requestNote];

function* startRequest(payload) {
  switch (payload.type) {
    case noteConstants.saveNote: {
      yield call(saveNote, payload);
      break;
    }

    case noteConstants.fetchNotesFromLocal: {
      yield call(fetchNotesFromLocal, payload);
      break;
    }

    default:
      break;
  }
}

function* fetchNotesFromLocal() {
  try {
    const notes = yield call(getLatestNotes, 20);

    yield put({
      type: noteConstants.fetchNotesFromLocalSuccess,
      notes: notes || []
    });
  } catch (error) {
    console.log(error);
    yield put({ type: noteConstants.fetchNotesFromLocalError, error: error });
  }
}

function* saveNote({ payload }) {
  const { note } = payload;
  try {
    const newNote = yield call(saveDataToStorage, 'notes', note);

    yield put({ type: noteConstants.saveNoteSuccess, newNote: newNote });

    return note;
  } catch (error) {
    console.log(error);
    yield put({ type: noteConstants.saveNoteError, error });
    return error;
  }
}

async function saveDataToStorage(key, value) {
  if (!value?.id && !value?.cloudId) {
    const id = await db?.[key]?.add(value);
    value.id = id;
  } else if (value?.cloudId) {
    const notes = await db?.[key]?.where({ cloudId: value?.cloudId || '' }).toArray();
    if (notes?.length == 0) {
      await db?.[key]?.add(value);
    } else {
      await db?.[key]?.update(notes?.[0]?.id, {
        ...(notes?.[0] || {}),
        ...(value || {}),
        id: notes?.[0]?.id
      });

      return { ...(notes?.[0] || {}), ...(value || {}), id: notes?.[0]?.id };
    }
  } else {
    await db?.[key]?.update(value?.id, value);
  }
  return value;
}

export function* requestNote() {
  yield takeEvery(
    [
      noteConstants.createTempNote,
      noteConstants.clearCurrentNote,
      noteConstants.saveNote,
      noteConstants.uploadToCloud
    ],
    startRequest
  );

  yield takeLatest([noteConstants.fetchNotesFromLocal], startRequest);
}
