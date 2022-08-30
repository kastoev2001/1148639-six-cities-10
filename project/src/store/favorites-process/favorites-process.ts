import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';
import { fetchFavoriteOffersAction, toggleFavoriteAction } from './favorites-async-action';
import { removeOffer } from '../../utils/offers';


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
        const favoriteOffers = action.payload;

        state.favoriteOffers = favoriteOffers;
        state.favoriteOffersStatus.isLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.favoriteOffersStatus.isLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.favoriteOffersStatus.isLoaded = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { favoriteOffers } = state;
        const replaceableOffer = action.payload;
        const replacedesOffers = removeOffer(favoriteOffers, replaceableOffer);

        state.favoriteOffers = replacedesOffers;
      });
  },
});

export const { resetFavoriteOffers } = favoritesProcess.actions;
