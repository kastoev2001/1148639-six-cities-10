import Room from './room';
import FormComment from '../../components/room/form-comment/form-comment';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/test-router';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeComments, getFakeOffers } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

jest.mock('../../store/comments-process/comments-async-action', () => ({
  __esModule: true,
  fetchCommentsAction: () => ({
    type: 'data/fetchComments'
  }),
}));

jest.mock('../../store/offer-process/offer-async-action', () => ({
  __esModule: true,

}));

jest.mock('../../store/nearby-offers-process/nearby-offers-async-action', () => ({
  __esModule: true,
  fetchNearbyOffersAction: () => ({
    type: 'data/fetchNearbyOffers',
  }),
}));

jest.mock('../../store/user-process/user-async-action', () => ({
  __esModule: true,
  logoutAction: () => ({
    type: 'user/logout',
  }),
}));

jest.mock('../../store/favorites-process/favorites-async-action', () => ({
  __esModule: true,
  toggleFavoriteAction: () => ({
    type: 'data/toggleFavorite',
  }),
}));

const mockOffers = getFakeOffers();
const mockNearbyOffers = mockOffers.slice(3);
const mockComments = getFakeComments();
const mockStore = configureMockStore();
const mockOffer = mockOffers[2];

describe('Component: Room.', () => {
  it('Should render currectly.', () => {
    const store = mockStore({
      nearbyOffers: { nearbyOffers: mockNearbyOffers, isNearByOffersLoaded: false },
      comments: { comments: mockComments, isCommnetsLoaded: false },
      offer: { activeOffer: mockOffer, isOfferLoaded: false },
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      newComment: {
        newCommentStatus: {
          isloaded: false,
          isSuccessed: false,
          isRejected: false,
        }
      },
      city: { activeCity: 'Paris' },
    });

    render(
      <Provider store={store}>
        <Room />
      </Provider>
    );

    screen.getByText(/Dishwasher/i);
    screen.getByText(/Other places in the neighbourhood/i);
  });

  it('Should enter data in the fields sending new comment.', async () => {
    const offerId = mockOffer.id;
    const store = mockStore({
      newComment: {
        newCommentStatus: {
          isloaded: false,
          isSuccessed: false,
          isRejected: false
        }
      },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <FormComment offerId={offerId} />
      </Provider>
    );

    const ratings: HTMLInputElement[] = screen.getAllByTestId(/input/i);
    const textareaElement: HTMLTextAreaElement = screen.getByDisplayValue('');
    const buttonElement: HTMLButtonElement = screen.getByText(/Submit/);
    const mockDescription = 'для проверки табуляции с точки зрения конечного пользователя.';
    expect(textareaElement).toBeInTheDocument();
    expect(ratings).toHaveLength(5);
    expect(buttonElement.disabled).toBe(true);

    const rating = ratings[4];

    await userEvent.click(rating);
    await userEvent.click(textareaElement);
    await userEvent.keyboard(mockDescription);

    expect(rating.checked).toBe(true);
    expect(mockDescription === textareaElement.value).toBe(true);
    expect(buttonElement.disabled).toBe(false);
  });
});
