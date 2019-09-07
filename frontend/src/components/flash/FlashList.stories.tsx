import React from 'react';
import { storiesOf } from '@storybook/react';

import { FlashList } from './FlashList';
import { mockDataDefault } from './FlashList.mock';

storiesOf('Flash|FlashList', module).add('Default', () => (
  <FlashList {...mockDataDefault} />
));
