import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flash from './flash';
import auth from './auth';
import questions from './questions';
import comments from './comments';
import qlists from './qlists';
import candidates from './candidates';

const reducer = combineReducers({
  flash,
  auth,
  questions,
  comments,
  qlists,
  candidates,
  form: formReducer,
  routing: routerReducer,
});

export default reducer;