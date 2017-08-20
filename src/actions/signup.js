import axios from 'axios';

import { USER_SIGNUP } from './types';

export const userGot = () => ({
  type: USER_SIGNUP
});

export const userSignupRequest = userData =>
  dispatch => axios.post('/api/users/', userData)
    .then(() => dispatch(userGot()));

export const isUserExists = identifier =>
  () => axios.get(`/api/users/${identifier}`);

export const getUser = id =>
  dispatch => axios.get(`/api/users/id/${id}`)
    .then(res => dispatch(userGot(res.data.user)));

export const removeUserById = id =>
  () => axios.delete(`/api/users/${id}`);

export const updateUser = user =>
  () => axios.put(`/api/users/${user._id}`, user);