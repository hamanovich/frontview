import React from 'react';
import { shallow } from 'enzyme';

import { SignupForm } from '../../components/SignupPage/SignupForm';

describe('<SignupForm/>', () => {
  const username = 'username';
  const signupOk = jest.fn(() => Promise.resolve('Success'));
  const signupFailed = jest.fn(() => Promise.reject(new Error('Failed')));
  const userExist = jest.fn(() => Promise.resolve({ data: { username } }));
  const userDoesntExist = jest.fn(() => Promise.resolve({ data: { username: undefined } }));
  const props = {
    signup: signupOk,
    reset: jest.fn(),
    addFlashMessage: jest.fn(),
    isUserExists: userExist,
    handleSubmit: fn => fn,
  };
  const initialState = {
    errors: {
      username: '',
      email: '',
    },
    isLoading: false,
    invalid: false,
  };
  const user = {
    email: 'test@test.test',
    password: 'test',
    passwordConfirmation: 'test',
    username: 'test',
  };

  const component = shallow(<SignupForm {...props} />);

  it('renders <SignupForm /> component', () => {
    expect(component).toMatchSnapshot();
  });

  describe('when User blurs from username field and user is exists', () => {
    beforeEach(() =>
      component
        .find('Field[name="username"]')
        .simulate('blur', { target: { value: username, name: 'username' } }),
    );

    it('checks whether user exists or not', () => {
      expect(props.isUserExists).toHaveBeenCalled();
    });

    it('checks user exists and state has error message', () => {
      expect(component.state().errors.username).toBe(`There is user with such ${username}`);
      expect(component.state().invalid).toBeTruthy();
    });

    afterEach(() => component.setState(initialState));
  });

  describe('when User blurs from username field and has no user found', () => {
    const component = shallow(<SignupForm {...props} isUserExists={userDoesntExist} />);
    beforeEach(() =>
      component
        .find('Field[name="username"]')
        .simulate('blur', { target: { value: username, name: 'username' } }),
    );

    it("checks user doesn't exist and state has no error message", () => {
      expect(component.state().errors.username).toBe('');
      expect(component.state().invalid).toBeFalsy();
    });

    afterEach(() => component.setState(initialState));
  });

  describe('when user blurs from username field with empty value', () => {
    beforeEach(() =>
      component
        .find('Field[name="username"]')
        .simulate('blur', { target: { value: '', name: 'username' } }),
    );

    it("doesn't check user existance", () => {
      expect(component.state().errors.username).toBe('');
      expect(component.state().invalid).toBeFalsy();
    });
  });

  describe('when user submits the Signup Form and Promise resolves with status 200', () => {
    beforeEach(() => component.find('ForwardRef(Bootstrap(Form))').simulate('submit', user));

    it('invokes onSubmit method with Ok', () => {
      expect(props.signup).toHaveBeenCalledWith(user);
    });
  });

  describe('when user submits the Signup Form and Promise throws an error', () => {
    const component = shallow(<SignupForm {...props} signup={signupFailed} />);

    beforeEach(() => component.find('ForwardRef(Bootstrap(Form))').simulate('submit', user));

    it('adds errorMsg to state', () => {
      expect(component.state().errors.errorMsg).toBe('Failed');
    });
  });
});
