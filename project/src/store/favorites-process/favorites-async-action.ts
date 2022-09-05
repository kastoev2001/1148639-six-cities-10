import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { AppDispatch, State } from '../../types/state';
import { notifyUserOfAnError } from '../../utils/user/user';

export const toggleFavoriteAction = createAsyncThunk<
  Offer | AxiosError,
  {
    offerId: number,
    status: number,
  },
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'data/toggleFavorite',
  async ({ offerId, status }, { extra: api, rejectWithValue }) => {
    const requestFavorite = `${APIRoute.Favorite}/${offerId}/${status}`;

    try {
      const { data } = await api.post<Offer>(requestFavorite);

      return data;
    } catch (error) {
      notifyUserOfAnError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  Offers | AxiosError,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'data/fetchFavoriteOffers',
  async (_arg, { extra: api, rejectWithValue }) => {

    try {
      const { data } = await api.get<Offers>(APIRoute.Favorite);

      return data;
    } catch (error) {
      notifyUserOfAnError(error as AxiosError);
      return rejectWithValue(error);
    }
  }
);
