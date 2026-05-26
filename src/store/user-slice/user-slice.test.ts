import {configureStore} from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import userReducer, {checkAuth, login, logout, clearAuthError} from './user-slice';
import {createAPI} from '../../services/api';
import {AuthorizationStatus, RequestStatus} from '../../const';

vi.mock('../../services/token', () => ({
  getToken: vi.fn(() => 'test-token'),
  saveToken: vi.fn(),
  dropToken: vi.fn(),
}));

const makeMockUser = (overrides = {}) => ({
  email: 'test@test.ru',
  token: 'test-token',
  ...overrides,
});

describe('user-slice reducer tests', () => {
  const initialState = {
    authorizationStatus: AuthorizationStatus.Unknown,
    authRequestStatus: RequestStatus.Idle,
    user: null,
    authError: null,
  };

  it('should return initial state with empty action', () => {
    expect(userReducer(undefined, {type: ''})).toEqual(initialState);
  });

  it('should clear auth error', () => {
    const state = userReducer(
      {
        ...initialState,
        authError: 'Some error',
      },
      clearAuthError()
    );

    expect(state.authError).toBeNull();
  });

  it('should set authRequestStatus to Loading on checkAuth.pending', () => {
    const state = userReducer(
      initialState,
      checkAuth.pending('', undefined)
    );

    expect(state.authRequestStatus).toBe(RequestStatus.Loading);
  });

  it('should set user and auth status on checkAuth.fulfilled', () => {
    const user = makeMockUser();

    const state = userReducer(
      initialState,
      checkAuth.fulfilled(user, '', undefined)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.authRequestStatus).toBe(RequestStatus.Success);
    expect(state.user).toEqual(user);
  });

  it('should reset user on checkAuth.rejected', () => {
    const state = userReducer(
      initialState,
      checkAuth.rejected(new Error('error'), '', undefined)
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.authRequestStatus).toBe(RequestStatus.Failed);
    expect(state.user).toBeNull();
  });

  it('should set authRequestStatus to Loading on login.pending', () => {
    const state = userReducer(
      initialState,
      login.pending('', {
        email: 'test@test.ru',
        password: '123456abc',
      })
    );

    expect(state.authRequestStatus).toBe(RequestStatus.Loading);
    expect(state.authError).toBeNull();
  });

  it('should set user and auth status on login.fulfilled', () => {
    const user = makeMockUser();

    const state = userReducer(
      initialState,
      login.fulfilled(user, '', {
        email: 'test@test.ru',
        password: '123456abc',
      })
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.authRequestStatus).toBe(RequestStatus.Success);
    expect(state.user).toEqual(user);
    expect(state.authError).toBeNull();
  });

  it('should set error on login.rejected', () => {
    const state = userReducer(
      initialState,
      login.rejected(new Error('error'), '', {
        email: 'test@test.ru',
        password: '123',
      })
    );

    expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.authRequestStatus).toBe(RequestStatus.Failed);
    expect(state.user).toBeNull();

    expect(state.authError).toBe(
      'Не удалось авторизоваться. Проверьте логин и пароль или попробуйте позже.'
    );
  });

  it('should set authRequestStatus to Loading on logout.pending', () => {
    const state = userReducer(
      initialState,
      logout.pending('', undefined)
    );

    expect(state.authRequestStatus).toBe(RequestStatus.Loading);
  });

  it('should clear user on logout.fulfilled', () => {
    const state = userReducer(
      {
        ...initialState,
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeMockUser(),
      },
      logout.fulfilled(undefined, '', undefined)
    );

    expect(state.authorizationStatus).toBe(
      AuthorizationStatus.NoAuth
    );

    expect(state.user).toBeNull();
  });
});

describe('user-slice async thunks tests', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);

  beforeEach(() => {
    mockAPI.reset();
  });

  it('should dispatch checkAuth and store user', async () => {
    const mockUser = makeMockUser();

    mockAPI.onGet('/login').reply(200, mockUser);

    const store = configureStore({
      reducer: {USER: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

    await store.dispatch(checkAuth());

    const state = store.getState().USER;

    expect(state.authorizationStatus).toBe(
      AuthorizationStatus.Auth
    );

    expect(state.authRequestStatus).toBe(
      RequestStatus.Success
    );

    expect(state.user).toEqual(mockUser);
  });

  it('should dispatch login and store user', async () => {
    const mockUser = makeMockUser();

    mockAPI.onPost('/login').reply(200, mockUser);

    const store = configureStore({
      reducer: {USER: userReducer},
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

    await store.dispatch(
      login({
        email: 'test@test.ru',
        password: '123456abc',
      })
    );

    const state = store.getState().USER;

    expect(state.authorizationStatus).toBe(
      AuthorizationStatus.Auth
    );

    expect(state.authRequestStatus).toBe(
      RequestStatus.Success
    );

    expect(state.user).toEqual(mockUser);
  });

  it('should dispatch logout and clear user', async () => {
    mockAPI.onDelete('/logout').reply(204);

    const store = configureStore({
      reducer: {USER: userReducer},
      preloadedState: {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          authRequestStatus: RequestStatus.Idle,
          user: makeMockUser(),
          authError: null,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

    await store.dispatch(logout());

    const state = store.getState().USER;

    expect(state.authorizationStatus).toBe(
      AuthorizationStatus.NoAuth
    );

    expect(state.user).toBeNull();
  });
});
