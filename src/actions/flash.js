import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE, DELETE_FLASH_MESSAGES } from './types';

export const addFlashMessage = payload => ({
  type: ADD_FLASH_MESSAGE,
  payload,
});

export const deleteFlashMessage = payload => ({
  type: DELETE_FLASH_MESSAGE,
  payload,
});


export const deleteFlashMessages = () => ({
  type: DELETE_FLASH_MESSAGES,
});
