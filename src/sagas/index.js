import { fork, all } from 'redux-saga/effects';

import userSagas from './user';
import noteSagas from './note';

export default function* rootSaga() {
  yield all([fork(...userSagas), fork(...noteSagas)]);
}
