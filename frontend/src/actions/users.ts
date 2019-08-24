import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import api from '../api';
import { AppState } from '../reducers';
import { USERS_GET, USER_REMOVE, USER_UPDATE_ROLE } from './types';
import { User, RoleEnum } from '../propTypes/UserType';

interface usersGetAction {
  type: typeof USERS_GET;
  users: User[];
}

interface userRemoveAction {
  type: typeof USER_REMOVE;
  username: string;
}

interface userRoleUpdateAction {
  type: typeof USER_UPDATE_ROLE;
  username: string;
  role: RoleEnum;
}

export type UserActionTypes =
  | usersGetAction
  | userRemoveAction
  | userRoleUpdateAction;

export const usersGet = (users: User[]): UserActionTypes => ({
  type: USERS_GET,
  users,
});

export const userRemoved = (username: string) => ({
  type: USER_REMOVE,
  username,
});

export const userRoleUpdated = (username: string, role: string) => ({
  type: USER_UPDATE_ROLE,
  username,
  role,
});

export const getAllUsers = (): ThunkAction<
  Promise<{}>,
  AppState,
  null,
  Action<string>
> => (dispatch: ThunkDispatch<{}, {}, Action<string>>) =>
  api.user.getAllUsers().then(users => dispatch(usersGet(users)));

export const updateUserRole = (
  username: string,
  role: string,
): ThunkAction<Promise<{}>, AppState, null, Action<string>> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
) =>
  api.user
    .updateRole(username, role)
    .then(res => dispatch(userRoleUpdated(res.username, res.role)));

export const removeUser = (
  username: string,
): ThunkAction<Promise<{}>, AppState, null, Action<string>> => (
  dispatch: ThunkDispatch<{}, {}, Action<string>>,
) => api.user.remove(username).then(res => dispatch(userRemoved(res.username)));
