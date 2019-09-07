import { FlashListProps } from './FlashList';
import { action } from '@storybook/addon-actions';

import { mockDataSuccess, mockDataWarning, mockDataDanger } from './Flash.mock';

export const mockDataDefault: FlashListProps = {
  messages: [
    mockDataSuccess.message,
    mockDataWarning.message,
    mockDataDanger.message,
  ],
  deleteFlashMessage: action('deleteFlashMessage'),
};
