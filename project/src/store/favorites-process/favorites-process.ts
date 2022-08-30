import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { fetchFavoriteOffersAction, toggleFavoriteAction } from './favorites-async-action';
import { removeOffer } from '../../utils/offers';
import { notifyUserOfAnError } from '../../utils/user';
import { AxiosError } from 'axios';


type InitialState = {
  favoriteOffers: Offers,
  favoriteOffersStatus: {
    isLoaded: boolean,
    isRejected: boolean,
    isSuccessed: boolean,
  }
}

const initialState: InitialState = {
  favoriteOffers: [],
  favoriteOffersStatus: {
    isLoaded: false,
    isRejected: false,
    isSuccessed: false,
  },
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    resetFavoriteOffers: (state) => {
      state.favoriteOffers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        const favoriteOffers = action.payload as Offers;

        state.favoriteOffers = favoriteOffers;
        state.favoriteOffersStatus.isLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersStatus.isLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state, action) => {
        const error = action.payload as AxiosError;

        state.favoriteOffersStatus.isLoaded = false;

        notifyUserOfAnError(error);
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { favoriteOffers } = state;
        const replaceableOffer = action.payload as Offer;
        const replacedesOffers = removeOffer(favoriteOffers, replaceableOffer);

        state.favoriteOffers = replacedesOffers;
      })
      .addCase(toggleFavoriteAction.rejected, (_arg, action) => {
        const error = action.payload as AxiosError;

        notifyUserOfAnError(error);
      });
  },
});

export const { resetFavoriteOffers } = favoritesProcess.actions;
