import { takeEvery } from 'redux-saga/effects';
import { noteConstants } from '../constants/note';

export default [requestUser];

// eslint-disable-next-line no-unused-vars
function* startRequest(payload) {}

export function* requestUser() {
  yield takeEvery([noteConstants.createTempNote, noteConstants.clearCurrentNote], startRequest);
}
