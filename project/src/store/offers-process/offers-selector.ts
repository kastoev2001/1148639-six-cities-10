import { State } from '../../types/state';

export const getOffers = (state: State) =>
	state.offers.offers;

export const getIsOffersLoaded = (state: State) => 
	state.offers.isOffersLoaded;