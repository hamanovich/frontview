import React from 'react';
import { storiesOf } from '@storybook/react';

import { Flash } from './Flash';
import {
  mockDataSuccess,
  mockDataWarning,
  mockDataDanger,
  mockDataWithMarkdown,
} from './Flash.mock';

storiesOf('Flash|Flash Item', module)
  .add('Success', () => <Flash {...mockDataSuccess} />)
  .add('Warning', () => <Flash {...mockDataWarning} />)
  .add('Danger', () => <Flash {...mockDataDanger} />)
  .add('With Markdown', () => <Flash {...mockDataWithMarkdown} />);
