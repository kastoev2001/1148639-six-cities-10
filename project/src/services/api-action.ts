import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';
import { loadOffers, setDataLoadedStatus } from '../store/action';

export const fetchOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>('data/fetchOffers', async (
  _arg,
  { dispatch, extra: api },
) => {
  dispatch(setDataLoadedStatus(true));
  const { data } = await api.get<Offers>(APIRoute.Hotels);
  dispatch(loadOffers(data));
  dispatch(setDataLoadedStatus(false));
});
