import PrivateRoute from './private-route';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore();

describe('Component: PrivateRoute', () => {
  it('Should render currently', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <PrivateRoute><p>Page is Favorite</p></PrivateRoute>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Page is Favorite/i)).toBeInTheDocument();
  });
});
