import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { fetchFavoriteOffersAction, toggleFavoriteAction } from './favorites-async-action';
import { removeOffer } from '../../utils/offers';


type InitialState = {
  favoriteOffers: Offers,
  isFavoriteOffersLoaded: boolean,
}

const initialState: InitialState = {
  favoriteOffers: [],
  isFavoriteOffersLoaded: false,
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
        state.isFavoriteOffersLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffers = [];
        state.isFavoriteOffersLoaded = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { favoriteOffers } = state;
        const replaceableOffer = action.payload as Offer;
        const replacedesOffers = removeOffer(favoriteOffers, replaceableOffer);

        state.favoriteOffers = replacedesOffers;
      });
  },
});

export const { resetFavoriteOffers } = favoritesProcess.actions;
