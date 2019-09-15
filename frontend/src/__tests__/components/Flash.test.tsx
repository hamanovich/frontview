import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Flash, FlashProps } from '../../components/flash/Flash';
import { mockDataDanger } from '../../components/flash/Flash.mock';

describe('<Flash/>', () => {
  const mockData = {
    ...mockDataDanger,
    close: jest.fn(),
  };

  const component: ShallowWrapper<FlashProps> = shallow(
    <Flash {...mockData} />,
  );

  it('renders <Flash /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('updates via props', () => {
    component.setProps({
      message: { type: 'success', text: 'Success' },
    });

    expect(component.find('MarkdownRenderer').prop('markdown')).toEqual(
      'Success',
    );
  });

  describe('when clicking close button', () => {
    beforeEach(() =>
      component.find('Button').simulate('click', mockData.message.id),
    );

    it('invokes the close callback', () => {
      expect(mockData.close).toHaveBeenCalled();
      expect(mockData.close).toHaveBeenCalledWith(mockData.message.id);
    });
  });
});
