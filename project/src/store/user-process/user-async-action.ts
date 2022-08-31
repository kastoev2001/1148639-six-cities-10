import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, UserEmail } from '../../types/state';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { UserData } from '../../types/user-data';
import { AuthData } from '../../types/auth-data';
import { dropToken, saveToken } from '../../services/token';
import { resetOffers } from '../offers-process/offers-process';
import { resetOffer } from '../offer-process/offer-process';
import { resetFavoriteOffers } from '../favorites-process/favorites-process';
import { resetNearbyOffers } from '../nearby-offers-process/nearby-offers-process';
import { AxiosError } from 'axios';
import { notifyUserOfAnError } from '../../utils/user';

export const checkAuthAction = createAsyncThunk<
  string, void,
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
  UserEmail | AxiosError,
  AuthData,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'user/login',
  async ({ login: email, password }, { extra: api, rejectWithValue }) => {
    try {
      const { data: { token, email: userEmail } } = await api.post<UserData>(APIRoute.Login, { email, password });

      saveToken(token);

      return userEmail;
    } catch (error) {
      notifyUserOfAnError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);

export const logoutAction = createAsyncThunk<void | AxiosError, undefined, {
  dispath: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api, rejectWithValue }) => {
    try {
      await api.delete(APIRoute.Logout);

      dropToken();
      dispatch(resetOffers());
      dispatch(resetOffer());
      dispatch(resetFavoriteOffers());
      dispatch(resetNearbyOffers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
