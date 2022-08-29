import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { AppDispatch, State } from '../../types/state';


export const toggleFavoriteAction = createAsyncThunk<
  Offer,
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
  async ({ offerId, status }, { extra: api }) => {
    const requestFavorite = `${APIRoute.Favorite}/${offerId}/${status}`;

    const { data } = await api.post<Offer>(requestFavorite);

    return data;
  }
);

export const fetchFavoriteOffersAction = createAsyncThunk<
  Offers,
  undefined,
  {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }
>(
  'favorite/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offers>(APIRoute.Favorite);

    return data;
  }
);
