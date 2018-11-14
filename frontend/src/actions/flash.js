import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_FLASH_MESSAGES } from './types';

export const addFlashMessage = payload => ({
  type: ADD_FLASH_MESSAGE,
  payload,
});

export const deleteFlashMessage = id => ({
  type: DELETE_FLASH_MESSAGE,
  id,
});

export const deleteFlashMessages = () => ({
  type: DELETE_FLASH_MESSAGES,
});
