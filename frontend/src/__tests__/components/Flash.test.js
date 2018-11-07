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

  const flash = shallow(<Flash {...props} />);
  
  it('renders <Flash /> component', () => {
    expect(flash).toMatchSnapshot();
  });

  it('updates via props', () => {
    flash.setProps({
      message: { type: 'success', text: 'Success' },
    });

    expect(flash.find('span').text()).toEqual('Success');
    expect(flash).toMatchSnapshot();
  });

  describe('when clicking close button', () => {
    beforeEach(() => {
      flash.find('Button').simulate('click');
    })

    it ('invokes the close callback', () => {
      expect(props.close).toHaveBeenCalled();
    })
  })
});
