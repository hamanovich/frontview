import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import jwtDecode from 'jwt-decode';

import api from '../api';
import { AppState } from '../reducers';
import { setAuthorizationToken } from '../utils/helpers';
import { USER_GET, SET_CURRENT_USER, CLEANUP_CURRENT_USER } from './types';
import { User } from '../propTypes/UserType';

interface setCurrentUserActon {
  type: typeof SET_CURRENT_USER;
  user: User;
}

interface logoutUserActon {
  type: typeof CLEANUP_CURRENT_USER;
  user: User;
}

interface userGetAction {
  type: typeof USER_GET;
  user: User;
}

export interface Credentials {
  identifier: string;
  password: string;
}

export const userGet = (user: User) => ({
  type: USER_GET,
  user,
});

export const setCurrentUser = (user: User | {}) => ({
  type: SET_CURRENT_USER,
  user,
});

export const logoutUser = () => ({
  type: CLEANUP_CURRENT_USER,
  user: {},
});

export const login = (
  credentials: Credentials,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.user.login(credentials).then(token => {
    const decoded: any = jwtDecode(token);

    localStorage.jwtToken = token;
    setAuthorizationToken(token);
    dispatch(setCurrentUser(decoded));
  });

export const logout = (): ThunkAction<
  void,
  AppState,
  null,
  Action<string>
> => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthorizationToken(false);
  dispatch(logoutUser());
};

export const confirm = (
  token: string,
): ThunkAction<void, AppState, null, Action<string>> => dispatch =>
  api.user.confirm(token).then(token => {
    const decoded: any = jwtDecode(token);

    localStorage.jwtToken = token;
    setAuthorizationToken(token);
    dispatch(setCurrentUser(decoded));
  });

export const forgot = (email: string) => () => api.user.forgot(email);
export const getReset = (token: string) => () => api.user.getReset(token);
export const resetToken = (
  token: string,
  passwords: { password: string; passwordConfirmation: string },
) => () => api.user.reset(token, passwords);

export const signup = (user: User) => () => api.user.signup(user);
export const isUserExists = (identifier: string) => () =>
  api.user.isUserExists(identifier);
export const removeUser = (username: string) => () => api.user.remove(username);
export const updateUser = (user: User) => () => api.user.update(user);
export const getUser = (
  identifier: string,
): ThunkAction<Promise<{}>, AppState, null, Action<string>> => dispatch =>
  api.user.getUser(identifier).then(user => dispatch(userGet(user)));

export type AuthActionTypes =
  | setCurrentUserActon
  | logoutUserActon
  | userGetAction;
