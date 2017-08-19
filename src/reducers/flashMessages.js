import shortid from 'shortid';
import findIndex from 'lodash/findIndex';

import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_FLASH_MESSAGES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      const { type, text } = action.payload;

      return [
        ...state,
        { id: shortid.generate(), type, text }
      ];

    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.payload });

      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }

      return state;

    case DELETE_FLASH_MESSAGES:
      return [];

    default:
      return state;
  }
};
