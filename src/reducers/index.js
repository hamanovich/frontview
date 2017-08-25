import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import flashMessages from './flashMessages';
import auth from './auth';

const reducer = combineReducers({
  flashMessages,
  auth,
  form: formReducer
});

export default reducer;
