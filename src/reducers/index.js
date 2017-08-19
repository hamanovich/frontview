import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import flashMessages from './flashMessages';

const reducer = combineReducers({
  flashMessages,
  form: formReducer
});

export default reducer;
