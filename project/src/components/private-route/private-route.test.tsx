import PrivateRoute from './private-route';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';

import { Provider } from 'react-redux';
import { render, screen } from '../../utils/test-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Route, Routes } from 'react-router-dom';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  it('Should render "Login" if auth.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store} >
        <PrivateRoute><p>Page is Favorite</p></PrivateRoute>
      </Provider>
    );

    expect(screen.getByText(/Page is Favorite/i)).toBeInTheDocument();
  });

  it('Should render "Login" if no auth.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store} >
        <Routes>
          <Route path={AppRoute.Favorites} element={<PrivateRoute><Favorites /></PrivateRoute>} />
          <Route path={AppRoute.Login} element={<Login />} />
        </Routes>
      </Provider>,
      [AppRoute.Favorites]
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });
});
