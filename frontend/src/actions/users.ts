import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { USERS_GET, USER_REMOVE } from './types';
import { User } from '../propTypes/UserType';

interface usersGetAction {
  type: typeof USERS_GET;
  users: User[];
}

interface userRemoveAction {
  type: typeof USER_REMOVE;
  username: string;
}

export type UserActionTypes = usersGetAction | userRemoveAction;

export const usersGet = (users: User[]): UserActionTypes => ({
  type: USERS_GET,
  users,
});

export const userRemoved = (username: string) => ({
  type: USER_REMOVE,
  username,
});

export const getAllUsers = (): ThunkAction<
  Promise<{}>,
  AppState,
  null,
  Action<string>
> => (dispatch: ThunkDispatch<{}, {}, Action<string>>) =>
  api.user.getAllUsers().then(users => dispatch(usersGet(users)));

export const removeUser = (
  username: string,
): ThunkAction<Promise<{}>, AppState, null, Action<string>> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
) => api.user.remove(username).then(res => dispatch(userRemoved(res.username)));
