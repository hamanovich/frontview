import { User } from '../propTypes/UserType';
import { USERS_GET, USER_REMOVE } from '../actions/types';
import { UserActionTypes } from '../actions/users';

const initialState: User[] = [];

export default (state = initialState, action: UserActionTypes): User[] => {
  switch (action.type) {
    case USERS_GET:
      return action.users;

    case USER_REMOVE: {
      const removeIndex = state.findIndex(
        user => user.username === action.username,
      );

      if (removeIndex > -1) {
        return [
          ...state.slice(0, removeIndex),
          ...state.slice(removeIndex + 1),
        ];
      }

      return state;
    }

    default:
      return state;
  }
};
