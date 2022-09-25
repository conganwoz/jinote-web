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
  },
  uploadToCloud: {
    isUploading: false,
    message: '',
    success: false,
    data: null
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

    case noteConstants.fetchNotesFromLocalSuccess: {
      return update(state, {
        noteData: {
          isFetching: { $set: false },
          success: { $set: true },
          message: { $set: "Your Notes've been loaded successfully" },
          notes: { $set: action?.notes || [] }
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
      const idx = state?.noteData?.notes?.findIndex((item) => item?.id == newNote?.id);
      return update(state, {
        saveNote: {
          isSaving: { $set: false },
          success: { $set: true },
          message: { $set: 'Your note has been saved' }
        },
        noteData: {
          notes: { $splice: idx === -1 ? [[0, 0, newNote]] : [[idx, 1, newNote]] }
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

    case noteConstants.selectNote: {
      return update(state, {
        currentNote: { $set: action?.payload || null }
      });
    }

    case noteConstants.uploadToCloud: {
      return update(state, {
        uploadToCloud: {
          isUploading: { $set: true },
          message: { $set: '' },
          success: { $set: false }
        }
      });
    }

    case noteConstants.uploadToCloudSuccess: {
      return update(state, {
        uploadToCloud: {
          isUploading: { $set: false },
          message: { $set: action?.message },
          success: { $set: true }
        }
      });
    }

    case noteConstants.uploadToCloudError: {
      return update(state, {
        uploadToCloud: {
          isUploading: { $set: false },
          message: { $set: action?.message },
          success: { $set: false }
        }
      });
    }

    default:
      return state;
  }
};

export default noteReducer;
