import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { getFakeOffers } from '../../utils/mocks';
import { Offer } from '../../types/offers';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { fetchFavoriteOffersAction, toggleFavoriteAction } from './favorites-async-action';
import { APIRoute } from '../../const';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middleweres = [thunk.withExtraArgument(api)];

const mokeStore = configureMockStore<
	State,
	Action,
	ThunkDispatch<State, typeof api, Action>
>(middleweres)
const mockFavoriteOffers = getFakeOffers().map((offer: Offer) => {
	offer.isFavorite = true;

	return offer;
});
const mockOffer = mockFavoriteOffers[2];

describe('Async action.', () => {
	it('Should update propety favoriteOffers when server status 200.', async () => {
		const store = mokeStore();

		mockAPI
			.onGet(APIRoute.Favorite)
			.reply(200, {data: mockFavoriteOffers});

		expect(store.getActions()).toEqual([]);

		await store.dispatch(fetchFavoriteOffersAction());

		const actions = store.getActions().map(({type}) => type);

		expect(actions).toEqual([
			fetchFavoriteOffersAction.pending.type,
			fetchFavoriteOffersAction.fulfilled.type,
		]);
	});

	it('Should change status propety of a favorite  when server status 200.', async () => {
		const store = mokeStore();
		const isStatus = 0;
		const offerId = mockOffer.id;
    const requestFavorite = `${APIRoute.Favorite}/${offerId}/${isStatus}`;
		const changedMockOffers = {...mockOffer, isFavorite: Boolean(isStatus)};
		mockAPI
			.onPost(requestFavorite)
			.reply(200, {data: changedMockOffers});

		expect(store.getActions()).toEqual([]);

		await store.dispatch(toggleFavoriteAction({offerId, status: isStatus}));

		const actions = store.getActions().map(({type}) => type);

		expect(actions).toEqual([
			toggleFavoriteAction.pending.type,
			toggleFavoriteAction.fulfilled.type,
		]);
	});
});
