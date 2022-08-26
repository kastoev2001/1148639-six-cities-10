import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, UserEmail } from '../../types/state';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { UserData } from '../../types/user-data';
import { AuthData } from '../../types/auth-data';
import { dropToken, saveToken } from '../../services/token';

export const checkAuthAction = createAsyncThunk<
  string, undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'user/checkAuth',
    async (_arg, { extra: api }) => {
      const { data: { email: userEmail } } = await api.get<UserData>(APIRoute.Login);

      return userEmail;
    }
  );

export const loginAction = createAsyncThunk<
UserEmail,
AuthData,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const { data: {token, email: userEmail} } = await api.post<UserData>(APIRoute.Login, { email, password});

    saveToken(token);

    return userEmail;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispath: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);

    dropToken();
  }
);
