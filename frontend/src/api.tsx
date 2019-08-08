import axios from 'axios';
import { Credentials } from './actions/auth';
import { User } from './propTypes/UserType';
import { Comment } from './propTypes/CommentType';
import { QList } from './propTypes/QListType';
import { Question } from './propTypes/QuestionType';

export default {
  user: {
    login: (credentials: Credentials) =>
      axios.post('/api/auth', credentials).then(res => res.data),

    confirm: (token: string) =>
      axios.post('/api/auth/confirmation', { token }).then(res => res.data),

    forgot: (email: string) =>
      axios.post('/api/auth/forgot', email).then(res => res.data),

    getReset: (token: string) =>
      axios.get(`/api/auth/reset/${token}`).then(res => res.data),

    reset: (
      token: string,
      passwords: { password: string; passwordConfirmation: string },
    ) =>
      axios.post(`/api/auth/reset/${token}`, passwords).then(res => res.data),

    signup: (user: User) =>
      axios.post('/api/users/', user).then(res => res.data),

    isUserExists: (identifier: string) => axios.get(`/api/users/${identifier}`),

    getUser: (identifier: string) =>
      axios.get(`/api/users/${identifier}`).then(res => res.data),

    remove: (username: string) => axios.delete(`/api/user/${username}`),

    update: (user: User) => axios.put(`/api/user/${user.username}`, user),
  },

  comments: {
    add: (comment: Comment) =>
      axios.post('/api/comments/add', comment).then(res => res.data),

    getByAuthor: (username: string) =>
      axios.get(`/api/comments/author/${username}`).then(res => res.data),

    getNotVerified: () =>
      axios.get('/api/comments/not-verified').then(res => res.data),

    approve: (id: string) =>
      axios.patch(`/api/comment/${id}/approve`).then(res => res.data),
  },

  qlists: {
    add: (qlist: QList) =>
      axios.post('/api/qlist/add', qlist).then(res => res.data),

    addQuestion: (qlist: QList, question: Question) =>
      axios
        .post('/api/qlist/add/question', { qlist, question })
        .then(res => res.data),

    getQListQuestions: (username: string, slug: string) =>
      axios.get(`/api/qlists/${username}/${slug}`).then(res => res.data),

    getByAuthor: (username: string) =>
      axios.get(`/api/qlists/${username}`).then(res => res.data),

    remove: (_id: string) =>
      axios.delete(`/api/qlist/${_id}`).then(res => res.data),
  },

  candidates: {
    add: (candidate: any) =>
      axios.post('/api/candidates/add', candidate).then(res => res.data),

    getByInterviewer: (_id: string) =>
      axios.get(`/api/candidates/${_id}`).then(res => res.data),

    getCandidate: (_id: string) =>
      axios.get(`/api/candidate/${_id}`).then(res => res.data),

    remove: (_id: string) =>
      axios.delete(`/api/candidate/${_id}`).then(res => res.data),

    provideFeedback: (_id: string, feedback: any) =>
      axios
        .post(`/api/candidate/${_id}/feedback`, feedback)
        .then(res => res.data),
  },

  questions: {
    getInterface: () =>
      axios.get('/api/question/interface').then(res => res.data),

    getQuestions: (page: number) =>
      axios.get(`/api/questions/page/${page}`).then(res => res.data),

    getTop: () => axios.get('/api/questions/top/').then(res => res.data),

    getByFilter: (filter: string, tag: string) =>
      axios.get(`/api/questions/${filter}/${tag}`).then(res => res.data),

    getByQList: (qlist: string) =>
      axios.get(`/api/questions/${qlist}`).then(res => res.data),

    getById: (id: string) =>
      axios.get(`/api/question/${id}`).then(res => res.data),

    getBySlug: (slug: string) =>
      axios.get(`/api/question/${slug}/one`).then(res => res.data),

    getByAuthor: (username: string) =>
      axios.get(`/api/questions/author/${username}`).then(res => res.data),

    add: (question: Question) =>
      axios.post('/api/questions/add', question).then(res => res.data),

    addFromFile: (questions: Question[]) =>
      axios.post('/api/questions/addFromFile', questions).then(res => res.data),

    edit: (data: any) =>
      axios.put(`/api/question/${data._id}/edit`, data).then(res => res.data),

    approve: (id: string) =>
      axios.patch(`/api/question/${id}/approve`).then(res => res.data),

    editField: (id: string, field: string, value: string) =>
      axios
        .patch(`/api/question/${id}/edit`, { field, value })
        .then(res => res.data),

    remove: (id: string) =>
      axios.delete(`/api/question/${id}`).then(res => res.data),

    getSearched: (query: string) =>
      axios.get(`/api/search?q=${query}`).then(res => res.data),

    vote: (question: Question, action: string, userId: string) =>
      axios
        .put(`/api/question/${question._id}/vote`, { question, action, userId })
        .then(res => res.data),
  },
};
