import { favoritesProcess, resetFavoriteOffers } from './favorites-process';
import { getFakeOffers } from '../../utils/mocks';
import { fetchFavoriteOffersAction, toggleFavoriteAction } from './favorites-async-action';
import { removeOffer, replaceOffer } from '../../utils/offers';
import { Offer } from '../../types/offers';

const mockFavoriteOffers = getFakeOffers().map((offer: Offer) => {
  offer.isFavorite = true;
  return offer;
});
const mockOffer = { ...mockFavoriteOffers[3] };

mockOffer.isFavorite = false;

const changedmockFavoriteOffers = replaceOffer(mockFavoriteOffers, mockOffer);
const chengedfavoriteOffers = removeOffer(changedmockFavoriteOffers, mockOffer);

describe('Reducer: favoritePrcess.', () => {
  it('Should update propety FavoriteOffers when loaded favorite offers.', () => {
    const state = { favoriteOffers: [], isFavoriteOffersLoaded: false };

    expect(favoritesProcess.reducer(state, { type: fetchFavoriteOffersAction.fulfilled.type, payload: mockFavoriteOffers }))
      .toEqual({ favoriteOffers: mockFavoriteOffers, isFavoriteOffersLoaded: false });
  });

  it('Should update propety isFavoriteOffersLoaded when loading favorite offers.', () => {
    const state = { favoriteOffers: [], isFavoriteOffersLoaded: false };

    expect(favoritesProcess.reducer(state, { type: fetchFavoriteOffersAction.pending.type }))
      .toEqual({ favoriteOffers: [], isFavoriteOffersLoaded: true });
  });

  it('Should reset propety favoriteOffers and isFavoriteOffersLoaded when rejected favorite offers.', () => {
    const state = { favoriteOffers: [], isFavoriteOffersLoaded: false };

    expect(favoritesProcess.reducer(state, { type: fetchFavoriteOffersAction.rejected.type }))
      .toEqual({ favoriteOffers: [], isFavoriteOffersLoaded: false });
  });

  it('Should remove corresponding favorite offers when removed from favorite.', () => {
    const state = { favoriteOffers: changedmockFavoriteOffers, isFavoriteOffersLoaded: false };

    expect(favoritesProcess.reducer(state, { type: toggleFavoriteAction.fulfilled.type, payload: mockOffer }))
      .toEqual({ favoriteOffers: chengedfavoriteOffers, isFavoriteOffersLoaded: false });
  });

  it('Should reset propety favoriteOffers.', () => {
    const state = { favoriteOffers: mockFavoriteOffers, isFavoriteOffersLoaded: false };

    expect(favoritesProcess.reducer(state, resetFavoriteOffers()))
      .toEqual({ favoriteOffers: [], isFavoriteOffersLoaded: false });
  });
});
