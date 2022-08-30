import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { AppDispatch, State } from '../../types/state';


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
  'favorite/toggleFavorite',
  async ({ offerId, status }, { extra: api, rejectWithValue }) => {
    const requestFavorite = `${APIRoute.Favorite}/${offerId}/${status}`;

    try {
      const { data } = await api.post<Offer>(requestFavorite);

      return data;
    } catch(error) {
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
  'favorite/fetchFavoriteOffers',
  async (_arg, {extra: api, rejectWithValue}) => {

    try {
      const { data } = await api.get<Offers>(APIRoute.Favorite);

      return data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);
