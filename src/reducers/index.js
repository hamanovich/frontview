import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flash from './flash';
import auth from './auth';
import questions from './questions';

const reducer = combineReducers({
  flash,
  auth,
  questions,
  form: formReducer,
  routing: routerReducer
});

export default reducer;