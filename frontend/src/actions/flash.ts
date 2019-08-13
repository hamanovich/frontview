import { FlashMessageType } from '../propTypes';
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGES,
} from './types';

interface addFlashMessageAction {
  type: typeof ADD_FLASH_MESSAGE;
  payload: FlashMessageType;
}

interface deleteFlashMessageAction {
  type: typeof DELETE_FLASH_MESSAGE;
  id: string;
}

interface deleteFlashMessagesAction {
  type: typeof DELETE_FLASH_MESSAGES;
}

export const addFlashMessage = (payload: FlashMessageType) => ({
  type: ADD_FLASH_MESSAGE,
  payload,
});

export const deleteFlashMessage = (id: string | undefined) => ({
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
