import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../const';

export const fetchOffers = createAsyncThunk<Offers, undefined, {
    dispatch: AppDispatch,
    state: State,
    extra: AxiosInstance,
}>('data/fetchOffers', async (
    _arg,
    {extra: api},
) => {
    const { data } = await api.get<Offers>(APIRoute.Hotels);

    return data;
});