import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flash from './flash';
import auth from './auth';
import questions from './questions';
import comments from './comments';
import qlists from './qlists';

const reducer = combineReducers({
  flash,
  auth,
  questions,
  comments,
  qlists,
  form: formReducer,
  routing: routerReducer
});

export default reducer;