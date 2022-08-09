import { createSelector } from 'reselect';
import { State } from '../types/state';
import { Offers, Offer, LocationCity } from '../types/offers';

const filterOffersByCity = (city: LocationCity, offers: Offers): Offers => (
  offers.filter((offer: Offer): boolean => offer.city.name === city.name)
);

export const selectorFilterOffers = createSelector(
  (state: State) => state,
  (state: State): Offers => filterOffersByCity(state.activeCity, state.offers)
);
