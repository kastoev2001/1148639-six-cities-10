import Auth from './auth';

import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import { getFakeUserEmail, getFakeOffers } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const mockUserEmail = getFakeUserEmail();
const mockOffers = getFakeOffers();

describe('Component: Auth.', () => {
  it('Should render SignOut', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockUserEmail}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('Should render SignIn', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Should redirect by page "Favorites" when user click by link Avatar.', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail },
      offers: { offers: mockOffers, isOffersLaoded: false },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Favorites} element={<p>Page is Favorites</p>} />
            <Route path={AppRoute.Root} element={<p>Page is Main</p>} />
          </Routes>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockUserEmail}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('avatar'));

    expect(screen.getByText(/Page is Favorites/i)).toBeInTheDocument();
  });
});
