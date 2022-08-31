import { State } from '../../types/state';

export const getFavoriteOffers = (state: State) =>
  state.favorites.favoriteOffers;

export const getIsFavoriteOffersLoaded = (state: State) =>
  state.favorites.isFavoriteOffersLoaded;
