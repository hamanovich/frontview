import shortid from 'shortid';

import { Message } from '../propTypes/Message';

import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGES,
} from '../actions/types';
import { FlashActionTypes } from '../actions/flash';

const initialState: Message[] = [];

export default (state = initialState, action: FlashActionTypes): Message[] => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE: {
      const { type, text } = action.payload;

      return [...state, { id: shortid.generate(), type, text }];
    }

    case DELETE_FLASH_MESSAGE: {
      const index: number = state.findIndex(
        (msg: Message) => msg.id === action.id,
      );

      if (index >= 0) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }

      return state;
    }

    case DELETE_FLASH_MESSAGES:
      return initialState;

    default:
      return state;
  }
};
