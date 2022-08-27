import { createSelector } from 'reselect';
import { State } from '../types/state';
import { Offers } from '../types/offers';
import { filterOffersByCity, sortOffers } from '../utils/commands';

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
