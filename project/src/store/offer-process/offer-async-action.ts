import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'data/fetchOffer',
  async (
    offerId,
    { extra: api }
  ) => {
    const requestOffer = `${APIRoute.Hotels}/${offerId}`;
    const { data } = await api.get<Offer>(requestOffer);

    return data;
  }
);
