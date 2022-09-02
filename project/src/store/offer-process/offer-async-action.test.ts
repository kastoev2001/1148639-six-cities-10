import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchOfferAction } from './offer-async-action';
import { APIRoute } from '../../const';
import { getFakeOffers } from '../../utils/mocks';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockOffers = getFakeOffers();
const mockOffer = getFakeOffers()[5];
const middleweres = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
	State,
	Action,
	ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async actions.', () => {
	it('Should update propety activeOffer when server return 200.', async () => {
		const store = mockStore();
		const mokeOfferId = String(mockOffer.id)
		const requestOffer = `${APIRoute.Hotels}/${mokeOfferId}`;

		mockAPI
			.onGet(requestOffer)
			.reply(200, { data: mockOffer });

		expect(store.getActions()).toEqual([]);

		await store.dispatch(fetchOfferAction(mokeOfferId));

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toEqual([
			fetchOfferAction.pending.type,
			fetchOfferAction.fulfilled.type,
		]);
	});
});