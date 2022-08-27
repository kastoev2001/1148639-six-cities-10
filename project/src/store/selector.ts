import { createSelector } from 'reselect';
import { State } from '../types/state';
import { Offers } from '../types/offers';
import { filterOffersByCity, sortOffers } from '../utils/commands';

export const selectorFilterOffers = createSelector(
	(state: State) => state,
	(state: State): Offers => {
		const activeCity = state.city.activeCity;
		const offers = state.offers.offers;

		return filterOffersByCity(activeCity, offers);
	}
);

export const selectorSortOffers = createSelector(
	(state: State) => state,
	(state: State): Offers => {
		const currentSortType = state.main.currentSortType;
		const offers = state.offers.offers
		const activeCity = state.city.activeCity;

		const offersFiltred = filterOffersByCity(activeCity, offers);

		return sortOffers(state.main.currentSortType, offersFiltred);
	}
);
