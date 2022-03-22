import { combineReducers } from 'redux';
import noteReducer from './note';

const rootReducer = combineReducers({
  note: noteReducer
});

export default rootReducer;
