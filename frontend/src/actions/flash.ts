import { Message } from '../propTypes/Message';
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_FLASH_MESSAGES } from './types';

interface addFlashMessageAction {
  type: typeof ADD_FLASH_MESSAGE;
  payload: Message;
}

interface deleteFlashMessageAction {
  type: typeof DELETE_FLASH_MESSAGE;
  id: string;
}

interface deleteFlashMessagesAction {
  type: typeof DELETE_FLASH_MESSAGES;
}

export const addFlashMessage = (message: Message) => ({
  type: ADD_FLASH_MESSAGE,
  payload: message,
});

export const deleteFlashMessage = (id: string) => ({
  type: DELETE_FLASH_MESSAGE,
  id,
});

export const deleteFlashMessages = () => ({
  type: DELETE_FLASH_MESSAGES,
});

export type FlashActionTypes =
  | addFlashMessageAction
  | deleteFlashMessageAction
  | deleteFlashMessagesAction;
