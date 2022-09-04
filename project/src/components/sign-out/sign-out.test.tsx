import SignOut from './sign-out';

import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeUserEmail, getFakeOffers } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const mockUserEmail = getFakeUserEmail();
const mockOffers = getFakeOffers();

describe('Component: SignOut.', () => {
  it('Should render correctly', () => {
    const store = mockStore({
      user: { userEmail: mockUserEmail },
      offers: { offers: mockOffers }
    });


    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignOut />
        </BrowserRouter>
      </Provider>
    );

    const userEmailElement = screen.getByText(new RegExp(`${mockUserEmail}`, 'i'));

    expect(userEmailElement).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('Should redirect by page "favorite" when user click by link avatar.', async () => {
    const store = mockStore({
      user: { userEmail: mockUserEmail },
      offers: { offers: mockOffers }
    });
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root} element={<p>Page is Main</p>} />
            <Route path={AppRoute.Favorites} element={<p>Page is Favorites</p>} />
          </Routes>
          <SignOut />
        </BrowserRouter>
      </Provider>
    );

    const userEmailElement = screen.getByText(new RegExp(`${mockUserEmail}`, 'i'));

    expect(userEmailElement).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    const avatarElement = screen.getByTestId(/avatar/i);

    await userEvent.click(avatarElement);

    expect(screen.getByText(/Page is Favorites/i)).toBeInTheDocument();
  });
});
