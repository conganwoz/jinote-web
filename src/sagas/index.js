import { call, put, takeEvery, takeLatest, all, fork } from 'redux-saga/effects';

function* fetchNotes() {}

function* fetchNotesSuccess() {}

export default function* rootSaga() {
  yield all([]);
}
