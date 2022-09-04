import { fetchOffersAction } from './offers-async-action';
import { offersProcess, resetOffers } from './offers-process';
import { getFakeOffers } from '../../utils/mocks';
import { Offer } from '../../types/offers';

const mokeOffers = getFakeOffers();


describe('Reducer: offersProcess.', () => {
  it('Should update propety isOffersLoaded when loading offers.', () => {
    const state = { offers: [], isOffersLoaded: false };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.pending.type }))
      .toEqual({ offers: [], isOffersLoaded: true });
  });

  it('Should update propety Offers when loaded offers.', () => {
    const state = { offers: [], isOffersLoaded: false };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: mokeOffers }))
      .toEqual({ offers: mokeOffers, isOffersLoaded: false });
  });

  it('Should update propety Offers when rejected offers.', () => {
    const state = { offers: mokeOffers, isOffersLoaded: false };

    expect(offersProcess.reducer(state, { type: fetchOffersAction.rejected.type }))
      .toEqual({ offers: [], isOffersLoaded: false });
  });

  it('Should reset propety offers.', () => {
    const state = { offers: mokeOffers, isOffersLoaded: false };
    const resetMokeOffers = mokeOffers.map((offer: Offer) => {
      const newOffer = { ...offer };

      newOffer.isFavorite = false;

      return newOffer;
    });

    expect(offersProcess.reducer(state, resetOffers()))
      .toEqual({ offers: resetMokeOffers, isOffersLoaded: false });
  });
});
