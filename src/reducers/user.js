import update from 'immutability-helper';

import { userConstants } from '../constants/user';

const initialState = {
  currentUser: null,
  authenticate: {
    isProcessing: false,
    success: false,
    message: ''
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.authenticate: {
      return update(state, {
        currentUser: { $set: null },
        authenticate: {
          isProcessing: { $set: true },
          success: { $set: false },
          message: { $set: '' }
        }
      });
    }

    case userConstants.authenticateError: {
      return update(state, {
        currentUser: { $set: null },
        authenticate: {
          isProcessing: { $set: false }
        }
      });
    }

    case userConstants.authenticateSuccess: {
      return update(state, {
        authenticate: {
          isProcessing: { $set: false }
        }
      });
    }

    default:
      return state;
  }
};

export default userReducer;
