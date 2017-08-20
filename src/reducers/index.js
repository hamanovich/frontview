import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import flashMessages from './flashMessages';
import auth from './auth';

const reducer = combineReducers({
  flashMessages,
  auth,
  form: formReducer,
  routing: routerReducer
});

export default reducer;
