import { State } from '../../types/state';

export const getFavoriteOffers = (state: State) =>
  state.favorites.favoriteOffers;

export const getFavoriteOffersStatus = (state: State) =>
  state.favorites.favoriteOffersStatus;
