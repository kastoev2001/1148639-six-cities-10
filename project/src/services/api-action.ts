import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadOffers, setDataLoadedStatus, requireAuthorization, changeUserEmail } from '../store/action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from './token';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (
    _arg,
    { dispatch, extra: api, },
  ) => {
    dispatch(setDataLoadedStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Hotels);
    dispatch(loadOffers(data));
    dispatch(setDataLoadedStatus(false));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispath: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data: { email: userEmail } } = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(changeUserEmail(userEmail));
    } catch (err) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token, email: userEmail } } = await api.post<UserData>(APIRoute.Login, { email, password });

    saveToken(token);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(changeUserEmail(userEmail));
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
