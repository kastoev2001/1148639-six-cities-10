import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchOffersAction } from './offers-async-action';
import { APIRoute } from '../../const';
import { getFakeOffers } from '../../utils/mocks';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockOffers = getFakeOffers();
const middleweres = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
	State,
	Action,
	ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async actions.', () => {
	it('Should update propety offers when server return 200.', async () => {
		const store = mockStore();

		mockAPI
			.onGet(APIRoute.Hotels)
			.reply(200, { data: mockOffers });

		expect(store.getActions()).toEqual([]);

		await store.dispatch(fetchOffersAction());

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toEqual([
			fetchOffersAction.pending.type,
			fetchOffersAction.fulfilled.type,
		]);
	});
});
