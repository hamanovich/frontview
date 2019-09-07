import { FlashProps } from './Flash';
import { action } from '@storybook/addon-actions';

export const mockDataSuccess: FlashProps = {
  close: action('close'),
  message: {
    id: '1',
    type: 'success',
    text: 'Well Done!',
  },
};

export const mockDataWithMarkdown: FlashProps = {
  ...mockDataSuccess,
  message: {
    ...mockDataSuccess.message,
    text: 'The `Question` with id=__123__ was removed. _Good job_!',
  },
};

export const mockDataWarning: FlashProps = {
  ...mockDataSuccess,
  message: {
    ...mockDataSuccess.message,
    type: 'warning',
    text: 'Watch out!',
  },
};

export const mockDataDanger: FlashProps = {
  ...mockDataSuccess,
  message: {
    ...mockDataSuccess.message,
    type: 'error',
    text: 'Be careful!',
  },
};
