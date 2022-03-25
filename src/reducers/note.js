import update from 'immutability-helper';

import { noteConstants } from '../constants/note';

const initialState = {
  currentNote: null
};

const defaultTempNote = {
  content: "<h1><strong>What's next?</strong></h1>",
  title: 'Your new note!...'
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case noteConstants.createTempNote: {
      return update(state, {
        currentNote: { $set: { ...defaultTempNote } }
      });
    }

    case noteConstants.clearCurrentNote: {
      return update(state, {
        currentNote: { $set: null }
      });
    }

    default:
      return state;
  }
};

export default noteReducer;
