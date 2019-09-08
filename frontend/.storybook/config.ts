import { configure, addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

import '../src/index.css';

addDecorator(withA11y);

addParameters({ viewport: { viewports: INITIAL_VIEWPORTS } });

addParameters({
  options: {
    hierarchySeparator: /\/|\.|\|/,
    hierarchyRootSeparator: /\|/,
  },
});

const req = require.context('../src', true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
