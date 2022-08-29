import { createSlice } from '@reduxjs/toolkit';
import { Offers } from '../../types/offers';
import { NameSpace } from '../../const';
import { fetchOffersAction } from './offers-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { replaceOffer } from '../../utils/commands';

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
      })
			.addCase(fetchOffersAction.rejected, (state) => {
				state.offers = [];
				state.isOffersLoaded = false;
			})
			.addCase(toggleFavoriteAction.fulfilled, (state, action) => {
				const offers = state.offers;
				const replaceableOffer = action.payload;
				const replacedesOffers = replaceOffer(offers, replaceableOffer);
				
				state.offers = replacedesOffers;
			});
  },
});
