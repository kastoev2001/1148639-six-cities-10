import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { fetchNearbyOffersAction } from './nearby-offers-async-action';

type InitialState = {
  nearbyOffers: Offers,
  isNearbyOffersLoaded: boolean,
};

const initialState: InitialState = {
  nearbyOffers: [],
  isNearbyOffersLoaded: false,
};

export const nearbyOffersProcess = createSlice({
  name: NameSpace.NearbyOffers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        const nearbyOffers = action.payload;

        state.nearbyOffers = nearbyOffers;
        state.isNearbyOffersLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.nearbyOffers = [];
        state.isNearbyOffersLoaded = false;
      });
  },
});
