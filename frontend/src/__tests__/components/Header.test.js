import React from 'react';
import { shallow } from 'enzyme';

import { Header } from '../../components/layout/Header';
import user from '../../__fixtures__/user';

describe('<Header/>', () => {
  const props = {
    auth: {
      isAuthenticated: true,
      user,
    },
    getSearchedQuestions: jest.fn(() => Promise.resolve('')),
    getUser: jest.fn(() => Promise.resolve('')),
    addFlashMessage: jest.fn(),
    logout: jest.fn(),
  };
  const context = {
    router: {
      history: {
        push: jest.fn(),
      },
    },
  };
  const values = { search: 'hello world wrong request' };

  describe('renders component with search Question', () => {
    const component = shallow(<Header {...props} />, { context });

    it('renders <Header /> component with search value', () => {
      expect(component).toMatchSnapshot();
    });

    describe('renders component with no Question', () => {
      beforeEach(() => component.instance().onSearch({ search: null }));

      it('checkes whether search field was filled', () => {
        expect(props.getSearchedQuestions).not.toHaveBeenCalled();
        expect(props.addFlashMessage).not.toHaveBeenCalled();
        expect(context.router.history.push).not.toHaveBeenCalled();
      });
    });

    describe('user wants to search questions', () => {
      beforeEach(() => component.instance().onSearch(values));

      it('checkes whether search field was filled', () => {
        expect(props.getSearchedQuestions).toHaveBeenCalledWith(values.search);
        expect(props.addFlashMessage).toHaveBeenCalled();
        expect(context.router.history.push).not.toHaveBeenCalled();
      });
    });

    describe("user wants to search questions but didn't type any word", () => {
      const component = shallow(
        <Header {...props} getSearchedQuestions={jest.fn(() => Promise.resolve([]))} />,
        { context },
      );
      beforeEach(() => component.instance().onSearch(''));

      it('checkes whether search field was filled', () => {
        expect(props.getSearchedQuestions).toHaveBeenCalled();
        expect(props.addFlashMessage).toHaveBeenCalled();
        expect(context.router.history.push).not.toHaveBeenCalled();
      });
    });
  });
});
