import React from 'react';
import { shallow } from 'enzyme';

import {
  Login as LoginForm,
  onSubmit,
} from '../../components/LoginPage/Login.tsx';
import user from '../../__fixtures__/user';

describe('<Login/>', () => {
  const initialState = {
    error: '',
    isLoading: false,
  };
  const props = {
    state: initialState,
    addFlashMessage: jest.fn(),
    onSubmit: jest.fn(),
    handleSubmit: fn => fn,
  };
  const loginOK = jest.fn(() => Promise.resolve('Success'));
  const loginFailed = jest.fn(() => Promise.reject(new Error('Failed')));
  const propsHandler = {
    login: loginOK,
    history: {
      push: jest.fn(),
    },
    getUser: jest.fn(),
    setState: jest.fn(),
  };

  const component = shallow(<LoginForm {...props} />);

  it('renders <Login /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders <Login /> component with error state', () => {
    const errorState = { error: 'Test Error', isLoading: false };
    const component = shallow(<LoginForm {...props} state={errorState} />);

    expect(component).toMatchSnapshot();
    expect(component.find('Alert[variant="danger"]').html()).toBe(
      `<div role="alert" class="fade alert alert-danger show">${errorState.error}</div>`,
    );
  });

  describe('when User submits the Login Form and Promise resolves with status 200', () => {
    beforeEach(() => component.find('Form').simulate('submit', user));

    it('invokes onSubmit method', () => {
      expect(props.onSubmit).toHaveBeenCalledWith(user);
    });
  });

  describe('when user tries to submit Login form and status OK', () => {
    it('invokes login props method with `user`', async () => {
      await onSubmit(propsHandler)(user);
      expect(propsHandler.login).toHaveBeenCalledWith(user);
    });

    it('invokes login props method with `user`', async () => {
      await onSubmit({ ...propsHandler, login: loginFailed })(user);
      expect(propsHandler.setState).toHaveBeenCalled();
    });
  });
});
