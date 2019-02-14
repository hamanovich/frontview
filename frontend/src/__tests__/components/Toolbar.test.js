import React from 'react';
import { shallow } from 'enzyme';

import { Toolbar } from '../../components/shared/Toolbar';
import { question } from '../../__fixtures__/questions';
import { qlists } from '../../__fixtures__/qlists';

describe('<Toolbar/>', () => {
  const props = {
    user: {},
    question,
    qlists,
    qlistAddQuestion: jest.fn(),
    voteQuestion: jest.fn(),
  };

  const component = shallow(<Toolbar {...props} />);

  it('renders <Toolbar /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('checks Qlists dropdown existance', () => {
    expect(component.find('DropdownButton')).toHaveLength(1);
  });
});
