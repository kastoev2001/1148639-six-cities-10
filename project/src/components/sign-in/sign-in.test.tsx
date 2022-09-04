import SignIn from './sign-in';

import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../../pages/login/login';
import userEvent from '@testing-library/user-event';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: SignIn.', () => {
  it('Should render correctly', () => {

    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('Should redirect by page "Login" when user click by sign in link.', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Login} element={<Login />} />
          </Routes>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );

    const linkElement = screen.getByText(/Sign in/i);

    await userEvent.click(linkElement);

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);
    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();
  });
});
