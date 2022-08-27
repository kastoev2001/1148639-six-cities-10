import { State } from '../../types/state';

export const getActiveOffer = (state: State) =>
  state.offer.activeOffer;

export const getIsOfferLoaded = (state: State) =>
  state.offer.isOfferLoaded;
