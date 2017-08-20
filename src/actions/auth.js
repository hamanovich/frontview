import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken';

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
