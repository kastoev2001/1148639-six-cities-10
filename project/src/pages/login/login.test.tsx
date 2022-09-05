import Login from './login';

import { screen, render } from '../../utils/test-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

jest.mock('../../store/user-process/user-async-action', () => ({
  __esModule: true,
  loginAction: () => ({
    type: 'user/loginAction',
  })
}));

const mockStore = configureMockStore();

describe('Component: Login.', () => {
  it('Should render corrently.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);

    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();

  });

  it('Should redirect by page "Main" when user click by link.', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Root} element={<p>Page is Main</p>} />
          <Route path={AppRoute.Login} element={<Login />} />
        </Routes>
      </Provider>,
      [AppRoute.Login]
    );

    const labalEmailElement = screen.getByPlaceholderText(/Email/i);
    const labalSignInElement = screen.getByPlaceholderText(/password/i);

    expect(labalEmailElement).toBeInTheDocument();
    expect(labalSignInElement).toBeInTheDocument();

    const logoElement = screen.getByTestId('logo');

    await userEvent.click(logoElement);

    expect(screen.getByText(/Page is Main/i)).toBeInTheDocument();
  });
});
