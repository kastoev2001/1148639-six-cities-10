import Favorites from './favorites';
import Login from '../login/login';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/test-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getFakeOffers } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';

jest.mock('../../store/favorites-process/favorites-async-action', () => ({
  __esModule: true,
  fetchFavoriteOffersAction: () => ({
    type: 'data/fetchOffers/fulfilled'
  })
}));

jest.mock('../../store/user-process/user-async-action', () => ({
  __esModule: true,
  checkAuthAction: () => ({
    type: 'data/fetchOffers',
  }),
  toggleFavoriteAction: () => ({
    type: 'data/toggleFavorite',
  }),
}));

const mockStore = configureMockStore();
const mockOffers = getFakeOffers();

describe('Component: Favorites.', () => {
  it('Should render currently.', () => {
    const favoriteOfferCount = mockOffers.length;

    const store = mockStore({
      favorites: { favoriteOffers: mockOffers, isFavoriteOffersLoaded: false },
      offers: { offers: mockOffers, isOffersLoaded: false },
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const spanElements = screen.getAllByTestId('favorite-card');

    expect(spanElements).toHaveLength(favoriteOfferCount);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('Should redirect by page "Login" when user click link avatar.', async () => {
    const favoriteOfferCount = mockOffers.length;
    const store = mockStore({
      favorites: { favoriteOffers: mockOffers, isFavoriteOffersLoaded: false },
      offers: { offers: mockOffers, isOffersLoaded: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorites} element={<Favorites />} />
        </Routes>
      </Provider>,
      [AppRoute.Favorites]
    );

    const spanElements = screen.getAllByTestId('favorite-card');
    const signInElement = screen.getByText(/Sign in/i);

    expect(spanElements).toHaveLength(favoriteOfferCount);
    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();

    await userEvent.click(signInElement);

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);

    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();
  });
});
