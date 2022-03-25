import { all } from 'redux-saga/effects';

import { noteConstants } from '../constants/note';

export default function* rootSaga() {
  yield all([noteConstants.createTempNote, noteConstants.clearCurrentNote]);
}
