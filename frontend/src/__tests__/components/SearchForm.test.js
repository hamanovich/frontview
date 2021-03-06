import React from 'react';
import { shallow } from 'enzyme';

// eslint-disable-next-line import/no-unresolved
import { SearchForm } from '../../components/layout/SearchForm';

describe('<SearchForm/>', () => {
  it('renders <SearchForm /> component', () => {
    const props = {
      handleSubmit: jest.fn(),
      onSearch: jest.fn(),
    };
    const component = shallow(<SearchForm {...props} />);

    expect(component).toMatchSnapshot();
  });
});
