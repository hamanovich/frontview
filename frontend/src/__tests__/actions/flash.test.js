import * as actions from '../../actions/flash';
import * as types from '../../actions/types';

describe('Flash actions', () => {
  it('creates an action to add a Flash message', () => {
    const payload = {
      type: 'success',
      text: 'Success',
    };
    const expectedAction = {
      type: types.ADD_FLASH_MESSAGE,
      payload,
    };

    expect(actions.addFlashMessage(payload)).toEqual(expectedAction);
  });

  it('creates an action to delete a Flash message', () => {
    const id = 1;
    const expectedAction = {
      type: types.DELETE_FLASH_MESSAGE,
      id,
    };

    expect(actions.deleteFlashMessage(id)).toEqual(expectedAction);
  });

  it('creates an action to delete all Flash messages', () => {
    const expectedAction = {
      type: types.DELETE_FLASH_MESSAGES,
    };

    expect(actions.deleteFlashMessages()).toEqual(expectedAction);
  });
});
