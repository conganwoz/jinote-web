import update from 'immutability-helper';

import { noteConstants } from '../constants/note';

const initialState = {
  currentNote: null,
  noteData: {
    isFetching: false,
    success: false,
    message: '',
    notes: []
  },
  saveNote: {
    isSaving: false,
    success: false,
    message: '',
    currentSaveNote: null
  }
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

    case noteConstants.fetchNotesFromLocal: {
      return update(state, {
        noteData: {
          isFetching: { $set: true },
          success: { $set: false },
          message: { $set: '' }
        }
      });
    }

    case noteConstants.fetchNotesFromLocalSucess: {
      return update(state, {
        noteData: {
          isFetching: { $set: false },
          success: { $set: true },
          message: { $set: "Your Notes've been loaded successfully" }
        }
      });
    }

    case noteConstants.fetchNotesFromLocalError: {
      return update(state, {
        noteData: {
          isFetching: { $set: false },
          success: { $set: false },
          message: { $set: 'Can not Load your notes' }
        }
      });
    }

    case noteConstants.saveNote: {
      const { note } = action?.payload || {};
      return update(state, {
        saveNote: {
          isSaving: { $set: true },
          success: { $set: false },
          message: { $set: '' },
          currentSaveNote: { $set: note || {} }
        }
      });
    }

    case noteConstants.saveNoteSuccess: {
      const { newNote } = action;
      return update(state, {
        saveNote: {
          isSaving: { $set: false },
          success: { $set: true },
          message: { $set: 'Your note has been saved' }
        },
        noteData: {
          notes: { $splice: [[0, 0, newNote]] }
        }
      });
    }

    case noteConstants.saveNoteError: {
      return update(state, {
        saveNote: {
          isSaving: { $set: false },
          success: { $set: false },
          message: { $set: 'Failed, Can not save your note! Please try later.' }
        }
      });
    }

    default:
      return state;
  }
};

export default noteReducer;
