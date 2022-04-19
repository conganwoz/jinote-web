import { call, put, takeEvery } from 'redux-saga/effects';
import { noteConstants } from '../constants/note';

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
    let currentNotes = localStorage.getItem('local-notes');

    if (!currentNotes) {
      yield call(saveDataToStorage, 'local-notes', {
        localNotes: {
          notes: [note]
        }
      });
    } else {
      currentNotes = JSON.parse(currentNotes);
      yield call(saveDataToStorage, 'local-notes', {
        localNotes: {
          notes: [note].concat(currentNotes?.localNotes?.notes || [])
        }
      });
    }

    yield put({ type: noteConstants.saveNoteSuccess, newNote: note });

    return note;
  } catch (error) {
    console.log(error);
    yield put({ type: noteConstants.saveNoteError, error });
    return error;
  }
}

function saveDataToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));

  return value;
}

export function* requestNote() {
  yield takeEvery(
    [noteConstants.createTempNote, noteConstants.clearCurrentNote, noteConstants.saveNote],
    startRequest
  );
}
