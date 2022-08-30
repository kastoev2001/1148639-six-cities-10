import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer } from '../../types/offers';
import { fetchOfferAction } from './offer-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { notifyUserOfAnError } from '../../utils/user';
import { AxiosError } from 'axios';

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
  reducers: {
    resetOffer: (state) => {
      const { activeOffer } = state;

      if (activeOffer) {
        activeOffer.isFavorite = false;
      }
    },
  },
  extraReducers: (buidler) => {
    buidler
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        const offer = action.payload as Offer;

        state.activeOffer = offer;
        state.isOfferLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        const error = action.payload as AxiosError;

        state.activeOffer = null;
        state.isOfferLoaded = false;

        notifyUserOfAnError(error);
      })
      .addCase(toggleFavoriteAction.fulfilled, (state) => {
        const activeOffer = state.activeOffer;

        if (activeOffer) {
          const {isFavorite} = activeOffer;

          activeOffer.isFavorite = !isFavorite;
        }

      });
  },
});

export const { resetOffer } = offerProcess.actions;
