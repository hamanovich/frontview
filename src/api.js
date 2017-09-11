import axios from 'axios';

export default {
  user: {
    login: credentials =>
      axios.post('/api/auth', credentials).then(res => res.data.token),

    forgot: email => axios.post('/api/auth/forgot', email).then(res => res.data),

    getReset: token => axios.get(`/api/auth/reset/${token}`)
      .then(res => res.data),

    reset: (token, passwords) => axios.post(`/api/auth/reset/${token}`, passwords)
      .then(res => res.data),

    signup: user => axios.post('/api/users/', user).then(res => res.data),

    getUser: identifier => axios.get(`/api/users/${identifier}`).then(res => res.data.user),

    remove: username => axios.delete(`/api/users/${username}`),

    update: user => axios.put(`/api/users/${user.username}`, user)
  },

  comments: {
    add: comment => axios.post('/api/comments/add', comment).then(res => res.data),

    getByAuthor: username => axios.get(`/api/comments/${username}`).then(res => res.data)
  }
};