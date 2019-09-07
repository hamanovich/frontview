import { configure, addParameters } from '@storybook/react';

import '../src/index.css';

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
