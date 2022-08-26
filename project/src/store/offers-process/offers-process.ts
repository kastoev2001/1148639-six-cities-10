import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/offers';
import { NameSpace } from '../../const';
import { fetchOffersAction } from './offers-async-action';

type InitialState = {
  offers: Offers,
  isOffersLoaded: boolean,
};

const initialState: InitialState = {
  offers: [],
  isOffersLoaded: false,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        const offers = action.payload;

        state.offers = offers;
        state.isOffersLoaded = false;
      });
  },
});
