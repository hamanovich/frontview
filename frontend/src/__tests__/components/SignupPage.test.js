import React from 'react';
import { shallow } from 'enzyme';

import { SignupPage } from '../../components/SignupPage';

describe('<SignupPage/>', () => {
  const props = {
    signup: jest.fn(),
    addFlashMessage: jest.fn(),
    isUserExists: jest.fn(),
  };

  it('renders <SignupPage /> component', () => {
    const component = shallow(<SignupPage {...props} />);

    expect(component).toMatchSnapshot();
  });
});
