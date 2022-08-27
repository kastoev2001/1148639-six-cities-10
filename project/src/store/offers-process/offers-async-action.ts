import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../types/state';
import { Offers } from '../../types/offers';
import { AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { APIRoute } from '../../const';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Hotels);

    return data;
  }
);
