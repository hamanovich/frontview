import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import { Flash } from './Flash';
import {
  mockDataSuccess,
  mockDataWarning,
  mockDataDanger,
  mockDataWithMarkdown,
} from './Flash.mock';

storiesOf('Flash|Flash Item', module)
  .addDecorator(withKnobs)
  .add('Success', () => (
    <Flash
      {...mockDataSuccess}
      message={object('message', { ...mockDataSuccess.message })}
    />
  ))
  .add('Warning', () => <Flash {...mockDataWarning} />)
  .add('Danger', () => <Flash {...mockDataDanger} />)
  .add('With Markdown', () => <Flash {...mockDataWithMarkdown} />);
