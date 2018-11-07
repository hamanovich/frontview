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

  const component = shallow(<FlashList {...props} />);

  it('renders <Flash /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('updates props correctly', () => {
    expect(component.find('Fragment').children()).toHaveLength(1);

    component.setProps({
      messages: [...props.messages, { id: 'DEF', type: 'success', text: 'Very positive text' }],
    });

    expect(component.find('Fragment').children()).toHaveLength(2);
    expect(component).toMatchSnapshot();
  });

  describe('when user wants to close the Flash message', () => {
    beforeEach(() =>
      component
        .find('Flash')
        .at(0)
        .props()
        .close());

    it('invokes `deleteFlashMessage` callback with id', () => {
      expect(props.deleteFlashMessage).toHaveBeenCalledWith(props.messages[0].id);
    });
  });
});
