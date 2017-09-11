import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/helpers';

import { SET_CURRENT_USER, CLEANUP_CURRENT_USER } from './types';

import api from '../api';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const logoutUser = () => ({
  type: CLEANUP_CURRENT_USER,
  user: {}
});

export const login = credentials =>
  dispatch => api.user.login(credentials)
    .then((token) => {
      const decoded = jwtDecode(token);

      localStorage.jwtToken = token;
      setAuthorizationToken(token);
      dispatch(setCurrentUser(decoded));
    });

export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutUser());
  };

export const confirm = token =>
  dispatch => api.user.confirm(token)
    .then((token) => {
      const decoded = jwtDecode(token);

      localStorage.jwtToken = token;
      setAuthorizationToken(token);
      dispatch(setCurrentUser(decoded));
    });

export const forgot = email => () => api.user.forgot(email);
export const getReset = token => () => api.user.getReset(token);
export const resetToken = (token, passwords) => () => api.user.reset(token, passwords);