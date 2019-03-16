import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form';

import flash from './flash';
import auth from './auth';
import questions from './questions';
import comments from './comments';
import qlists from './qlists';
import candidates from './candidates';

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    flash,
    auth,
    questions,
    comments,
    qlists,
    candidates,
    form: formReducer,
  });

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
