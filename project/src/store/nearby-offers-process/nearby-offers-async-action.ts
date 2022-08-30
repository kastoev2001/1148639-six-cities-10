import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Offers } from '../../types/offers';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';

export const fetchNearbyOffersAction = createAsyncThunk<
  Offers | AxiosInstance,
  string,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'data/fetchNearbyOffers',
  async (id, { extra: api, rejectWithValue }) => {
    const requestNearbyOffers = `${APIRoute.Hotels}/${id}/nearby`;

    try {
      const { data } = await api.get<Offers>(requestNearbyOffers);

      return data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);
