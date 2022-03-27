import { call, takeEvery, put } from 'redux-saga/effects';
import { userConstants } from '../constants/user';

export default [requestUser];

function* startRequest(payload) {
  switch (payload.type) {
    case userConstants.authenticate: {
      yield call(authenticate, payload);
      break;
    }

    default:
      break;
  }
}

function* authenticate({ payload }) {
  yield put({ type: userConstants.authenticateSuccess, data: payload });
}

export function* requestUser() {
  yield takeEvery([userConstants.authenticate], startRequest);
}
