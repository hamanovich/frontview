import axios from 'axios';

export default {
  user: {
    login: credentials => axios.post('/api/auth', credentials)
      .then(res => res.data),

    confirm: token => axios.post('/api/auth/confirmation', { token })
      .then(res => res.data),

    forgot: email => axios.post('/api/auth/forgot', email)
      .then(res => res.data),

    getReset: token => axios.get(`/api/auth/reset/${token}`)
      .then(res => res.data),

    reset: (token, passwords) => axios.post(`/api/auth/reset/${token}`, passwords)
      .then(res => res.data),

    signup: user => axios.post('/api/users/', user)
      .then(res => res.data),

    getUser: identifier => axios.get(`/api/users/${identifier}`)
      .then(res => res.data),

    remove: username => axios.delete(`/api/users/${username}`),

    update: user => axios.put(`/api/user/${user.username}`, user)
  },

  comments: {
    add: comment => axios.post('/api/comments/add', comment)
      .then(res => res.data),

    getByAuthor: username => axios.get(`/api/comments/${username}`)
      .then(res => res.data)
  },

  qlists: {
    add: qlist => axios.post('/api/qlist/add', qlist)
      .then(res => res.data),

    addQuestion: (qlist, question) => axios.post('/api/qlist/add/question', { qlist, question })
      .then(res => res.data),

    getByAuthor: _id => axios.get(`/api/qlists/${_id}`)
      .then(res => res.data),

    remove: _id => axios.delete(`/api/qlist/${_id}`)
      .then(res => res.data),
  },

  questions: {
    getInterface: () => axios.get('/api/question/interface')
      .then(res => res.data),

    getQuestions: page => axios.get(`/api/questions/page/${page}`)
      .then(res => res.data),

    getTop: () => axios.get('/api/questions/top/')
      .then(res => res.data),

    getByFilter: (filter, tag) => axios.get(`/api/questions/${filter}/${tag}`)
      .then(res => res.data),

    getByQList: qlist => axios.get(`api/questions/${qlist}`)
      .then(res => res.data),

    getById: id => axios.get(`/api/question/${id}`)
      .then(res => res.data),

    getBySlug: slug => axios.get(`/api/question/${slug}/one`)
      .then(res => res.data),

    getByAuthor: username => axios.get(`/api/questions/author/${username}`)
      .then(res => res.data),

    add: question => axios.post('/api/questions/add', question)
      .then(res => res.data),

    edit: data => axios.put(`/api/question/${data._id}/edit`, data)
      .then(res => res.data),

    editField: (id, field, value) => axios.patch(`/api/question/${id}/edit`, { field, value })
      .then(res => res.data),

    remove: id => axios.delete(`/api/question/${id}`)
      .then(res => res.data),

    getSearched: query => axios.get(`/api/search?q=${query}`)
      .then(res => res.data),

    vote: (question, action, userId) => axios.put(`/api/question/${question._id}/vote`, { question, action, userId })
      .then(res => res.data)
  }
};