import FavoritesEmpty from './favorites-empty';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();


const mockStore = configureMockStore();


describe('Component: FavoritesEmpty', () => {
  it('Should render currently', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers }
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <FavoritesEmpty />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Save properties to narrow down search or plan your future trips/i)).toBeInTheDocument();
    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });
});
