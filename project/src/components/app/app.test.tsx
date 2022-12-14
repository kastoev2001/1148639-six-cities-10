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
      city: { activeCity: 'Paris' },
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
      city: { activeCity: 'Paris' },
      main: { currentSortType: SortType.Popular }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      [AppRoute.Login]
    );

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);

    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
  });

  it('Should render "NotPage" when user navigate to "/offer"', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { activeCity: 'Paris' },
      main: { currentSortType: SortType.Popular },
      favorites: { favoriteOffers: mockOffers, isFavoriteOffersLoaded: false }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>,
      [AppRoute.Offer]
    );


    expect(screen.getByText(/?????????????? ?? ?????????????? ????????????????/i)).toBeInTheDocument();
  });
});
