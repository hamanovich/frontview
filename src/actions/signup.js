import axios from 'axios';

import { USER_GET } from './types';

import api from '../api';

export const userGet = user => ({
  type: USER_GET,
  user,
});

export const signup = user => () => api.user.signup(user);
export const isUserExists = identifier => () => axios.get(`/api/users/${identifier}`);
export const removeUser = username => () => api.user.remove(username);
export const updateUser = user => () => api.user.update(user);
export const getUser = identifier => dispatch =>
  api.user.getUser(identifier).then(user => dispatch(userGet(user)));
