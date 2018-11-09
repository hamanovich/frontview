import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../components/LoginPage';

describe('<LoginPage/>', () => {
  const props = {
    login: jest.fn(),
    forgot: jest.fn(),
    resetToken: jest.fn(),
    getReset: jest.fn(),
    getUser: jest.fn(),
    addFlashMessage: jest.fn(),
  };

  it('renders <LoginPage /> component', () => {
    const component = shallow(<LoginPage {...props} />);

    expect(component).toMatchSnapshot();
  });
});
