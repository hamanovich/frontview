import React from 'react';
import { shallow } from 'enzyme';

import { FlashList } from '../../components/flash/FlashList';

describe('<Flash/>', () => {
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

  describe('when user wants to close the Flash message', () => {
    beforeEach(() => {
      flashList
        .find('Flash')
        .at(0)
        .props()
        .close();
    });

    it('invokes `deleteFlashMessage` callback with id', () => {
      expect(props.deleteFlashMessage).toHaveBeenCalledWith(props.messages[0].id);
    });
  });
});
