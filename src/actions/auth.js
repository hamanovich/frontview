import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { setAuthorizationToken } from '../utils/helpers';

import { SET_CURRENT_USER, CLEANUP_CURRENT_USER } from './types';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user
});

export const logoutUser = () => ({
  type: CLEANUP_CURRENT_USER,
  user: {}
});

export const login = userData =>
  dispatch => axios.post('/api/auth', userData)
    .then((res) => {
      const token = res.data.token;
      const decoded = jwtDecode(token);

      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(decoded));
    });

export const logout = () =>
  (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(logoutUser());
  };

export const forgot = email =>
  () => axios.post('/api/auth/forgot', email)
    .then(res => res.data);

export const getReset = token =>
  () => axios.get(`/api/auth/reset/${token}`)
    .then(res => res.data);

export const resetToken = (token, passwords) =>
  () => axios.post(`/api/auth/reset/${token}`, passwords)
    .then(res => res.data);

