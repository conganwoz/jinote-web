import { combineReducers } from 'redux';
import noteReducer from './note';
import userReducer from './user';

const rootReducer = combineReducers({
  note: noteReducer,
  user: userReducer
});

export default rootReducer;
