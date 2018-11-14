import React from 'react';
import { shallow } from 'enzyme';

import Footer from '../../components/layout/Footer';

describe('<Footer/>', () => {
  it('renders <Footer /> component', () => {
    const component = shallow(<Footer />);

    expect(component).toMatchSnapshot();
  });
});
