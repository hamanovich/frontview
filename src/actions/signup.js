import axios from 'axios';

import { USER_GET } from './types';

export const userGet = user => ({
  type: USER_GET,
  user
});

export const userSignup = userData =>
  () => axios.post('/api/users/', userData);

export const isUserExists = identifier =>
  () => axios.get(`/api/users/${identifier}`);

export const getUser = identifier =>
  dispatch => axios.get(`/api/users/${identifier}`)
    .then(res => dispatch(userGet(res.data.user)));

export const removeUser = username =>
  () => axios.delete(`/api/users/${username}`);

export const updateUser = user =>
  () => axios.put(`/api/users/${user.username}`, user);