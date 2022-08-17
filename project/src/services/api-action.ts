import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { APIRoute, AuthorizationStatus } from '../const';
import { loadOffers, setDataLoadedStatus, requireAuthorization } from '../store/action';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (
  _arg,
  { dispatch, extra: api, getState },
) => {
  dispatch(setDataLoadedStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Hotels);
  dispatch(loadOffers(data));
  dispatch(setDataLoadedStatus(false));
  console.log(getState())
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispath: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch(err) {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
})