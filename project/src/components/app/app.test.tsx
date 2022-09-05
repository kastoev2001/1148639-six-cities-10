import App from './app';

import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, SortType } from '../../const';
import { render, screen } from '../../utils/test-router';

const mockOffers = getFakeOffers();


const mockStore = configureMockStore();

describe('Application Routing.', () => {
  it('Should render "MainEmpty" when user navigate to "/"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: [], isOffersLoaded: false },
      city: { aciveCity: 'Paris' },
      main: { currentSortType: SortType.Popular }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );


    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/Places/i)).toBeInTheDocument();
  });

  it('Should render "Login" when user navigate to "/login"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { aciveCity: 'Paris' },
      main: { currentSortType: SortType.Popular }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      [AppRoute.Login]
    );


    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
  });

  it('Should render "NotPage" when user navigate to "/offer"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { aciveCity: 'Paris' },
      main: { currentSortType: SortType.Popular },
      favorites: { favoriteOffers: mockOffers, isFavoriteOffersLoaded: false }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      [AppRoute.Offer]
    );


    expect(screen.getByText(/Перейти к главной странице/i)).toBeInTheDocument();
  });

  it('Should render "NotPage" when user navigate to wrong route"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      [`${AppRoute.Root}qwerqwerqwerqwer`]
    );


    expect(screen.getByText(/Перейти к главной странице/i)).toBeInTheDocument();
  });
});
