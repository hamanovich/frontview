import React from 'react';
import { render } from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';

import registerServiceWorker from './registerServiceWorker';

import Root from './components/Root';

render(<Root />, document.getElementById('frontview'));

registerServiceWorker();