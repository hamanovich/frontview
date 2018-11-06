import reducer from '../../reducers/flash';
import * as types from '../../actions/types';

jest.mock('shortid', () => ({
  generate: jest.fn(() => 0),
}));

describe('Flash reducer', () => {
  const payload = {
    type: 'error',
    text: 'Error',
  };

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it(`handles ${types.ADD_FLASH_MESSAGE}`, () => {
    expect(
      reducer([], {
        type: types.ADD_FLASH_MESSAGE,
        payload,
      }),
    ).toEqual([
      {
        id: 0,
        ...payload,
      },
    ]);
  });

  it(`handles ${types.DELETE_FLASH_MESSAGE}`, () => {
    expect(
      reducer(
        [
          {
            id: 0,
            ...payload,
          },
        ],
        {
          type: types.DELETE_FLASH_MESSAGE,
          id: 0,
        },
      ),
    ).toEqual([]);

    expect(
      reducer(
        [
          {
            id: 1,
            ...payload,
          },
        ],
        {
          type: types.DELETE_FLASH_MESSAGE,
          id: 0,
        },
      ),
    ).toEqual([
      {
        id: 1,
        ...payload,
      },
    ]);
  });

  it(`handles ${types.DELETE_FLASH_MESSAGES}`, () => {
    expect(
      reducer(
        [
          {
            id: 0,
            ...payload,
          },
        ],
        {
          type: types.DELETE_FLASH_MESSAGES,
        },
      ),
    ).toEqual([]);
  });
});
