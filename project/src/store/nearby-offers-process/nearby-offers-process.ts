import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offers, Offer } from '../../types/offers';
import { fetchNearbyOffersAction } from './nearby-offers-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { replaceOffer } from '../../utils/offers';

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
  reducers: {
    resetNearbyOffers: (state) => {
      state.nearbyOffers.forEach((offer: Offer) => {
        offer.isFavorite = false;
      });
    },
  },
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
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { nearbyOffers } = state;
        const replaceableOffer = action.payload;
        const replacedesOffers = replaceOffer(nearbyOffers, replaceableOffer);

        state.nearbyOffers = replacedesOffers;
      });
  },
});

export const { resetNearbyOffers } = nearbyOffersProcess.actions;
