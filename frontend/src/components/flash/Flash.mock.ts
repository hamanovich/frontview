import { action } from '@storybook/addon-actions';
import { FlashProps } from './Flash';

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
    id: '4',
    text: 'The `Question` with id=__123__ was removed. _Good job_!',
  },
};

export const mockDataWarning: FlashProps = {
  ...mockDataSuccess,
  message: {
    id: '2',
    type: 'warning',
    text: 'Watch out!',
  },
};

export const mockDataDanger: FlashProps = {
  ...mockDataSuccess,
  message: {
    id: '3',
    type: 'error',
    text: 'Be careful!',
  },
};
