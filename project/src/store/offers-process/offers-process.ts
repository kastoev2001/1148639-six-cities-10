import { createSlice } from '@reduxjs/toolkit';
import { Offer, Offers } from '../../types/offers';
import { NameSpace } from '../../const';
import { fetchOffersAction } from './offers-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { replaceOffer } from '../../utils/offers';
import { notifyUserOfAnError } from '../../utils/user';
import { AxiosError } from 'axios';

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
  reducers: {
    resetOffers: (state) => {
      state.offers.forEach((offer: Offer) => {
        offer.isFavorite = false;
      });
    },
  },
  extraReducers: (buidler) => {
    buidler
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        const offers = action.payload;

        state.offers = offers;
        state.isOffersLoaded = false;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        const error = action.payload as AxiosError;

        state.offers = [];
        state.isOffersLoaded = false;

        notifyUserOfAnError(error);
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { offers } = state;
        const replaceableOffer = action.payload as Offer;
        const replacedesOffers = replaceOffer(offers, replaceableOffer);

        state.offers = replacedesOffers;
      });
  },
});

export const { resetOffers } = offersProcess.actions;
