import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { FlashList, FlashListProps } from '../../components/flash/FlashList';
import { mockDataDefault } from '../../components/flash/FlashList.mock';

describe('<FlashList />', () => {
  const mockData = {
    ...mockDataDefault,
    deleteFlashMessage: jest.fn(),
  };
  const component: ShallowWrapper<FlashListProps> = shallow(
    <FlashList {...mockData} />,
  );

  it('renders <FlashList /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('updates props correctly', () => {
    expect(component.find('Fragment').children()).toHaveLength(3);

    component.setProps({
      messages: [
        ...mockData.messages,
        { id: 'DEF', type: 'success', text: 'Very positive text' },
      ],
    });

    expect(component.find('Fragment').children()).toHaveLength(4);
  });

  describe('when user wants to close the Flash message', () => {
    (component as any)
      .find('Memo(Flash)')
      .at(0)
      .prop('close')();

    it('invokes `deleteFlashMessage` callback with id', () => {
      expect(mockData.deleteFlashMessage).toHaveBeenCalled();
      expect(mockData.deleteFlashMessage).toHaveBeenCalledWith(
        mockData.messages[0].id,
      );
    });
  });
});
