import { nearbyOffersProcess, resetNearbyOffers } from './nearby-offers-process';
import { getFakeOffers } from '../../utils/mocks';
import { fetchNearbyOffersAction } from './nearby-offers-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { replaceOffer } from '../../utils/offers';
import { Offer } from '../../types/offers';

const mockOffers = getFakeOffers();
const mockOffer = { ...mockOffers[2] };

const changeMockOffer = { ...mockOffer, isFavorite: false };
const changedMockOffers = replaceOffer(mockOffers, changeMockOffer);

describe('Reducer: nearbyOffersPorcess.', () => {
  it('should update property nearbyOffers when loaded nearby offers.', () => {
    const state = { nearbyOffers: [], isNearbyOffersLoaded: false };
    expect(nearbyOffersProcess.reducer(state, { type: fetchNearbyOffersAction.fulfilled.type, payload: mockOffers }))
      .toEqual({ nearbyOffers: mockOffers, isNearbyOffersLoaded: false });
  });

  it('Should update propety isNearbyOffersLoaded when loading nearby offers.', () => {
    const state = { nearbyOffers: [], isNearbyOffersLoaded: false };

    expect(nearbyOffersProcess.reducer(state, { type: fetchNearbyOffersAction.pending.type }))
      .toEqual({ nearbyOffers: [], isNearbyOffersLoaded: true });
  });

  it('Should update propety nearbyOffers and isNearbyOffersLoaded when rejected nearby offers.', () => {
    const state = { nearbyOffers: [], isNearbyOffersLoaded: false };
    expect(nearbyOffersProcess.reducer(state, { type: fetchNearbyOffersAction.rejected.type }))
      .toEqual({ nearbyOffers: [], isNearbyOffersLoaded: false });
  });

  it('Should change state when loaded offer.', () => {
    const state = { nearbyOffers: mockOffers, isNearbyOffersLoaded: false };

    expect(nearbyOffersProcess.reducer(state, { type: toggleFavoriteAction.fulfilled.type, payload: changeMockOffer }))
      .toEqual({ nearbyOffers: changedMockOffers, isNearbyOffersLoaded: false });
  });

  it('Should reset propety nearbyOffers.', () => {
    const state = { nearbyOffers: mockOffers, isNearbyOffersLoaded: false };
    const resetNearbyOffer = mockOffers.map((offer: Offer) => {
      const newOffer = { ...offer };

      newOffer.isFavorite = false;

      return newOffer;
    });


    expect(nearbyOffersProcess.reducer(state, resetNearbyOffers()))
      .toEqual({ nearbyOffers: resetNearbyOffer, isNearbyOffersLoaded: false });
  });
});
