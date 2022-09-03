import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { checkAuthAction, loginAction, logoutAction } from './user-async-action';
import { APIRoute } from '../../const';
import { getFakeUserEmail, getFakeAuthData } from '../../utils/mocks';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { resetOffers } from '../offers-process/offers-process';
import { resetOffer } from '../offer-process/offer-process';
import { resetFavoriteOffers } from '../favorites-process/favorites-process';
import { resetNearbyOffers } from '../nearby-offers-process/nearby-offers-process';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockUserEmail = getFakeUserEmail();
const mackAuthData = getFakeAuthData();
const middleweres = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async actions.', () => {
  it('Should check auth when server return 200.', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, { data: mockUserEmail });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('Should update propety userEmail when server return 200.', async () => {
    const store = mockStore();
    const { login, password } = mackAuthData;

    mockAPI
      .onPost(APIRoute.Login, { email: login, password })
      .reply(200, { data: mockUserEmail });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loginAction(mackAuthData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('Should logout app when server return 204.', async () => {
    const store = mockStore();

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      resetOffers.toString(),
      resetOffer.toString(),
      resetFavoriteOffers.toString(),
      resetNearbyOffers.toString(),
      logoutAction.fulfilled.type,
    ]);
  });
});
