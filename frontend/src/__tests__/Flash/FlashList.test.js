import React from 'react';
import { shallow } from 'enzyme';

import { FlashList } from '../../components/flash/FlashList';

const props = {
  messages: [
    {
      id: 'ABC',
      type: 'error',
      text: 'Very negative text',
    },
  ],
  deleteFlashMessage: jest.fn(),
};

describe('<Flash/>', () => {
  const flashList = shallow(<FlashList {...props} />);

  it('renders <Flash /> component', () => {
    expect(flashList).toMatchSnapshot();
  });

  it('updates props correctly', () => {
    expect(flashList.find('Fragment').children()).toHaveLength(1);

    flashList.setProps({
      messages: [...props.messages, { id: 'DEF', type: 'success', text: 'Very positive text' }],
    });

    expect(flashList.find('Fragment').children()).toHaveLength(2);

    expect(flashList).toMatchSnapshot();
  });
});
