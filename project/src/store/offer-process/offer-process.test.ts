import { fetchOfferAction } from './offer-async-action';
import { toggleFavoriteAction } from '../favorites-process/favorites-async-action';
import { offerProcess } from './offer-process';
import { getFakeOffers } from '../../utils/mocks';

const mokeOffer = getFakeOffers()[0];
const resetMokeOffer = {...mokeOffer, isFavorite: false};

describe('Reducer: offerProcess.', () => {
	it('Should update propety isOfferLoaded when loading active offer.', () => {
		const state = {activeOffer: null, isOfferLoaded: false};

		expect(offerProcess.reducer(state, {type: fetchOfferAction.pending.type}))
		.toEqual({activeOffer: null, isOfferLoaded: true});
	});

	it('Should update propety activeOffer when loaded active offer.', () => {
		const state = {activeOffer: null, isOfferLoaded: false};

		expect(offerProcess.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: mokeOffer}))
		.toEqual({activeOffer: mokeOffer, isOfferLoaded: false});
	});

	it('Should update propety activeOffer when rejected active offer.', () => {
		const state = {activeOffer: mokeOffer, isOfferLoaded: false};

		expect(offerProcess.reducer(state, {type: fetchOfferAction.rejected.type}))
		.toEqual({activeOffer: null, isOfferLoaded: false});
	});

	it('Should reset propety nearbyOffers.', () => {
		const state = {activeOffer: mokeOffer, isOfferLoaded: false};

		expect(offerProcess.reducer(state, {type: toggleFavoriteAction.fulfilled.type, payload: mokeOffer}))
		.toEqual({activeOffer: resetMokeOffer, isOfferLoaded: false});
	});
})