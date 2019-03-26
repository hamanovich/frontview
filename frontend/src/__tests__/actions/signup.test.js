import mockAxios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../../actions/auth.ts';
import * as types from '../../actions/types.ts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ user: {} });

describe('Signup actions', () => {
  const user = {
    id: 1,
    username: 'test',
  };
  const expectedAction = {
    type: types.USER_GET,
    user,
  };

  afterEach(() => mockAxios.reset());

  it('creates an action to user has got', () => {
    expect(actions.userGet(user)).toEqual(expectedAction);
  });

  it('creates an action to get a user', async () => {
    mockAxios.get.mockResolvedValue({ data: user });

    await store.dispatch(actions.getUser(user.id));

    expect(store.getActions()).toEqual([expectedAction]);
    expect(mockAxios.get).toHaveBeenCalledWith(`/api/users/${user.id}`);
  });

  it('creates an api signup call', () => {
    actions.signup(user)();
    mockAxios.mockResponse({ data: user });
    expect(mockAxios.post).toHaveBeenCalledWith('/api/users/', user);
  });

  it('creates an api isUserExists call', () => {
    actions.isUserExists(user.id)();
    expect(mockAxios.get).toHaveBeenCalledWith(`/api/users/${user.id}`);
  });

  it('creates an api remove call', () => {
    actions.removeUser(user.username)();
    expect(mockAxios.delete).toHaveBeenCalledWith(`/api/user/${user.username}`);
  });

  it('creates an api update call', () => {
    actions.updateUser(user)();
    mockAxios.mockResponse({ data: user });
    expect(mockAxios.put).toHaveBeenCalledWith(
      `/api/user/${user.username}`,
      user,
    );
  });
});
