import { Auth, RoleEnum } from '../propTypes/UserType';
import {
  SET_CURRENT_USER,
  CLEANUP_CURRENT_USER,
  USER_GET,
} from '../actions/types';
import { AuthActionTypes } from '../actions/auth';

const initialState: Auth = {
  isAuthenticated: false,
  user: {
    _id: '',
    username: '',
    email: '',
    questions: [],
    votes: {
      like: [],
      dislike: [],
    },
    notes: '',
    role: RoleEnum.USER,
  },
};

export default (state = initialState, action: AuthActionTypes): Auth => {
  switch (action.type) {
    case SET_CURRENT_USER:
    case CLEANUP_CURRENT_USER:
    case USER_GET:
      return {
        isAuthenticated: Object.keys(action.user).length !== 0,
        user: action.user,
      };

    default:
      return state;
  }
};
