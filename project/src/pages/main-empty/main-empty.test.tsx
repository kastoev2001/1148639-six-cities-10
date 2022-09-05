import MainEmpty from './main-empty';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/test-router';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import Login from '../login/login';

const mockStore = configureMockStore();

describe('Component: MainEmpty.', () => {
  it('Should render currectly.', () => {
    const store = mockStore({
      user: { AuthorizationStatus: AuthorizationStatus.NoAuth },
      city: { activeCity: 'Paris' },
    });
    render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();
  });

  it('Should redirect by page "main" when user click by link avatar.', async () => {
    const store = mockStore({
      user: { AuthorizationStatus: AuthorizationStatus.NoAuth },
      city: { activeCity: 'Paris' },
    });
    render(
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Root} element={<MainEmpty />} />
          <Route path={AppRoute.Login} element={<Login />} />
        </Routes>
      </Provider>,
      [AppRoute.Root]
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Dusseldorf/i)).toBeInTheDocument();

    const avatar = screen.getByText(/Sign in/i);

    await userEvent.click(avatar);

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);

    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();
  });
});
