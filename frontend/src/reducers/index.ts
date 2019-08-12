import { combineReducers, Reducer } from 'redux';
import { History } from 'history';
import { connectRouter, RouterState } from 'connected-react-router';
import { reducer as formReducer, FormReducer } from 'redux-form';

import flash from './flash';
import auth from './auth';
import questions from './questions';
import comments from './comments';
import qlists from './qlists';
import candidates from './candidates';

import { Comment, FlashMessageType, Auth, Question, QList } from '../propTypes';

export interface RootState {
  router: RouterState;
  flash: FlashMessageType[];
  auth: Auth;
  questions: Question[];
  comments: Comment[];
  qlists: QList[];
  candidates: any;
  form: FormReducer;
}

const rootReducer = (history: History) =>
  combineReducers<Reducer<RootState>>({
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
