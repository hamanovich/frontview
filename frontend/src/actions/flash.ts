import { FlashMessageType } from '../propTypes';
import {
  ADD_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGE,
  DELETE_FLASH_MESSAGES,
} from './types';

interface AddFlashMessageAction {
  type: typeof ADD_FLASH_MESSAGE;
  payload: FlashMessageType;
}

interface DeleteFlashMessageAction {
  type: typeof DELETE_FLASH_MESSAGE;
  id: string;
}

interface DeleteFlashMessagesAction {
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
  | AddFlashMessageAction
  | DeleteFlashMessageAction
  | DeleteFlashMessagesAction;
