import {AxiosInstance} from 'axios';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {APIRoute, AuthorizationStatus, RequestStatus} from '../../const';
import {AuthData, User} from '../../types/user';
import {saveToken, dropToken} from '../../services/token';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  authRequestStatus: RequestStatus;
  user: User | null;
  authError: string | null;
};

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authRequestStatus: RequestStatus.Idle,
  user: null,
  authError: null,
};

export const checkAuth = createAsyncThunk<
  User,
  undefined,
  {extra: AxiosInstance}
>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<User>(APIRoute.Login);
    return data;
  }
);

export const login = createAsyncThunk<
  User,
  AuthData,
  {extra: AxiosInstance}
>(
  'user/login',
  async (authData, {extra: api}) => {
    const {data} = await api.post<User>(APIRoute.Login, authData);
    saveToken(data.token);
    return data;
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {extra: AxiosInstance}
>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.authError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.authRequestStatus = RequestStatus.Loading;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authRequestStatus = RequestStatus.Success;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authRequestStatus = RequestStatus.Failed;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.authRequestStatus = RequestStatus.Loading;
        state.authError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authRequestStatus = RequestStatus.Success;
        state.user = action.payload;
        state.authError = null;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authRequestStatus = RequestStatus.Failed;
        state.user = null;
        state.authError = 'Не удалось авторизоваться. Проверьте логин и пароль или попробуйте позже.';
      })
      .addCase(logout.pending, (state) => {
        state.authRequestStatus = RequestStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  },
});

export const {clearAuthError} = userSlice.actions;
export default userSlice.reducer;
