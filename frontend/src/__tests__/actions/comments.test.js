import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../actions/comments';
import * as types from '../../actions/types';

import { comment, comments } from '../../__fixtures__/comments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Comment actions', () => {
  const username = 'Fake user';

  afterEach(() => mockAxios.reset());

  describe('User add a new comment', () => {
    const store = mockStore([]);
    const expectedAction = {
      type: types.COMMENT_ADD,
      comment,
    };

    it('creates an action to inform user a comment has been added', () => {
      expect(actions.commentAdded(comment)).toEqual(expectedAction);
    });

    it('creates an action to add a comment', async () => {
      mockAxios.post.mockResolvedValue({ data: comment });

      await store.dispatch(actions.addComment(comment));

      expect(store.getActions()).toEqual([expectedAction]);
      expect(mockAxios.post).toHaveBeenCalledWith('/api/comments/add', comment);
    });
  });

  describe('Comments have been added', () => {
    const store = mockStore([]);
    const expectedAction = {
      type: types.COMMENTS_ADD,
      comments,
    };

    it('creates an action to inform user comments have been added', () => {
      expect(actions.addComments(comments)).toEqual(expectedAction);
    });

    it('creates an action to get comments by author', async () => {
      mockAxios.get.mockResolvedValue({ data: comments });

      await store.dispatch(actions.getCommentsByAuthor(username));

      expect(store.getActions()).toEqual([expectedAction]);
      expect(mockAxios.get).toHaveBeenCalledWith(
        `/api/comments/author/${username}`,
      );
    });
  });
});
