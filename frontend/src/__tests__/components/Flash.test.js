import React from 'react';
import { shallow } from 'enzyme';

import Flash from '../../components/flash/Flash';

describe('<Flash/>', () => {
  const props = {
    message: {
      type: 'error',
      text: 'Error',
    },
    close: jest.fn(),
  };

  const component = shallow(<Flash {...props} />);

  it('renders <Flash /> component', () => {
    expect(component).toMatchSnapshot();
  });

  it('updates via props', () => {
    component.setProps({
      message: { type: 'success', text: 'Success' },
    });

    expect(component.find('span').text()).toEqual('Success');
    expect(component).toMatchSnapshot();
  });

  describe('when clicking close button', () => {
    beforeEach(() => component.find('Button').simulate('click'));

    it('invokes the close callback', () => {
      expect(props.close).toHaveBeenCalled();
    });
  });
});
