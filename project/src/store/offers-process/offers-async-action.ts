import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../../types/state';
import { Offers } from '../../types/offers';
import { AxiosError, AxiosInstance } from 'axios';
import { State } from '../../types/state';
import { APIRoute } from '../../const';
import { notifyUserOfAnError } from '../../utils/user/user';

export const fetchOffersAction = createAsyncThunk<
  Offers | AxiosError,
  undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/fetchOffers',
    async (_arg, { extra: api, rejectWithValue }) => {
      try {
        const { data } = await api.get<Offers>(APIRoute.Hotels);

        return data;
      } catch (error) {
        notifyUserOfAnError(error as AxiosError);
        return rejectWithValue(error);
      }
    }
  );
