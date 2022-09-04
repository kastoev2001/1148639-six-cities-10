import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fetchCommentsAction } from './comments-async-action';
import { APIRoute } from '../../const';
import { getFakeComments } from '../../utils/mocks';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockComments = getFakeComments();
const middleweres = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async actions.', () => {


  it('Should update propety comments when server return 200.', async () => {
    const store = mockStore();
    const mokeOfferId = String(mockComments[1].id);
    const requestComments = `${APIRoute.Comments}/${mokeOfferId}`;

    mockAPI
      .onGet(requestComments)
      .reply(200, { data: mockComments });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCommentsAction(mokeOfferId));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type,
    ]);
  });
});
