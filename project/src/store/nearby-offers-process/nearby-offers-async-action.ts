import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Offers } from '../../types/offers';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { notifyUserOfAnError } from '../../utils/user/user';

export const fetchNearbyOffersAction = createAsyncThunk<
  Offers | AxiosError,
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
    } catch (error) {
      notifyUserOfAnError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);
