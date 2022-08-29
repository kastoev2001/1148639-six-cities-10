import { createSelector } from 'reselect';
import { State } from '../types/state';
import { Offers, Offer, } from '../types/offers';
import { filterOffersByCity, sortOffers } from '../utils/commands';

export const selectorGetLocationCity = createSelector(
	(state: State) => state,
	(state: State) => {
		const offers = state.offers.offers
		const activeCtiy = state.city.activeCity;

    const findedOffer = offers.find((offer: Offer): boolean => offer.city.name === activeCtiy);
		const location = findedOffer?.city.location

		return location ?? null;
	}
);

export const selectorSortOffers = createSelector(
  (state: State) => state,
  (state: State): Offers => {
    const currentSortType = state.main.currentSortType;
    const offers = state.offers.offers;
    const activeCity = state.city.activeCity;

    const offersFiltred = filterOffersByCity(activeCity, offers);
    const offersSorted = sortOffers(currentSortType, offersFiltred);

    return offersSorted;
  }
);

export const selectorGetFavoriteCount = createSelector(
	(state: State) => state,
	(state) => {
		const offers = state.offers.offers;
		const favoriteCount = offers.filter((offer: Offer) => offer.isFavorite).length

		return favoriteCount;
	}
);