import reducer from '../../reducers/comments';
import * as types from '../../actions/types';
import { comment, comments } from '../../__fixtures__/comments';

describe('Comments reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it(`handles ${types.COMMENTS_ADD}`, () => {
    expect(
      reducer([], {
        type: types.COMMENTS_ADD,
        comments,
      }),
    ).toEqual(comments);
  });

  it(`handles ${types.COMMENT_ADD}`, () => {
    expect(
      reducer(comments, {
        type: types.COMMENT_ADD,
        comment: { ...comment, _id: 3 },
      }),
    ).toEqual([...comments, { ...comment, _id: 3 }]);
  });
});
