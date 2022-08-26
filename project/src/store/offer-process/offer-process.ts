import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { fetchOfferAction } from './offer-async-action';

type ActiveOffer = Offer | null;

type InitialState = {
  activeOffer: ActiveOffer,
  isOfferLoaded: boolean,
};

const initialState: InitialState = {
  activeOffer: null,
  isOfferLoaded: false,
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers: (buidler) => {
    buidler
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        const offer = action.payload;

        state.activeOffer = offer;
				state.isOfferLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.activeOffer = null;
        state.isOfferLoaded = false;
      });
  },
});
