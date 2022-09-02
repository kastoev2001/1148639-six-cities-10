import MockAdapter from 'axios-mock-adapter';
import { getFakeOffers } from '../../utils/mocks';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import { State } from '../../types/state';
import { Action } from '@reduxjs/toolkit';
import { APIRoute } from '../../const';
import { fetchNearbyOffersAction } from './nearby-offers-async-action';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const middleweres = [thunk.withExtraArgument(api)];
const mockOffers = getFakeOffers();

const mockStore = configureMockStore<
	State,
	Action,
	ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async action.', () => {
	it('Should update propety nearbyOffers when server return 200.', async () => {
		const store = mockStore();
		const offerId = String(mockOffers[0].id);
		const requestNearbyOffers = `${APIRoute.Hotels}/${offerId}/nearby`;

		mockAPI
			.onGet(requestNearbyOffers)
			.reply(200, { date: mockOffers });

		expect(store.getActions()).toEqual([]);

		await store.dispatch(fetchNearbyOffersAction(offerId));

		const actions = store.getActions().map(({ type }) => type);

		expect(actions)
			.toEqual([
				fetchNearbyOffersAction.pending.type,
				fetchNearbyOffersAction.fulfilled.type,
			]);
	});
});
