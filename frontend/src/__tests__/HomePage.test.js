import React from 'react';
import { shallow } from 'enzyme';

import HomePage from '../components/HomePage';

describe('<HomePage/>', () => {
  it('renders <HomePage /> component', () => {
    const component = shallow(<HomePage />);

    expect(component).toMatchSnapshot();
  });
});
