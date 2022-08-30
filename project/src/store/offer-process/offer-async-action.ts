import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offer } from '../../types/offers';
import { AppDispatch } from '../../types/state';
import { State } from '../../types/state';
import { AxiosError, AxiosInstance } from 'axios';
import { APIRoute } from '../../const';


export const fetchOfferAction = createAsyncThunk<
  Offer | AxiosError,
  string, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
  }>(
    'data/fetchOffer',
    async (
      offerId,
      { extra: api, rejectWithValue }
    ) => {
      const requestOffer = `${APIRoute.Hotels}/${offerId}`;

      try {
        const { data } = await api.get<Offer>(requestOffer);

        return data;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
