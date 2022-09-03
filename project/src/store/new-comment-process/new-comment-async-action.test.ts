import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { Action } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { postNewCommentAction } from './new-comment-async-action';
import { APIRoute } from '../../const';
import { getFakeComments, getFakeNewComment, getFakeOffers } from '../../utils/mocks';
import { State } from '../../types/state';
import thunk, { ThunkDispatch } from 'redux-thunk';

const api = createAPI();
const mockAPI = new MockAdapter(api);
const mockOffer = getFakeOffers()[0];
const mockNewComment = getFakeNewComment();
const mockComments = getFakeComments();
const middleweres = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middleweres);

describe('Async action.', () => {
  it('Should update propety newCommentLoaded when server status 200.', async () => {
    const store = mockStore();
    const offerId = mockOffer.id;

    const requestNewComment = `${APIRoute.Comments}/${offerId}`;

    mockAPI
      .onPost(requestNewComment, mockNewComment)
      .reply(200, { data: mockComments });

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postNewCommentAction({ id: offerId, newComment: mockNewComment }));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postNewCommentAction.pending.type,
      postNewCommentAction.fulfilled.type,
    ]);
  });
});
