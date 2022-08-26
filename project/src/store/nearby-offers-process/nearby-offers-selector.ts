import { State } from '../../types/state';

export const getNearbyOffers = (state: State) =>
	state.nearbyOffers.nearbyOffers;

export const getIsNearbyOffersLoaded = (state: State) =>
	state.nearbyOffers.isNearbyOffersLoaded;
