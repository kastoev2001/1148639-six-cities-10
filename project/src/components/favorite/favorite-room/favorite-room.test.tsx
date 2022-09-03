import FavoriteRoom from './favorite-room';

import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus, ButtonFavoriteConfig } from '../../../const';
import { getFakeOffers } from '../../../utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockOffer = getFakeOffers()[0];
const mockStore = configureMockStore();

describe('Component: FavoriteRoom.', () => {
  it('Should render ButtonFavorite', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });
    const buttonCardClass = `${ButtonFavoriteConfig.Card.className}-button`;

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteRoom room={mockOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button').classList.contains(buttonCardClass)).toBe(true);
  });

  it('Should render StatusRoom.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <FavoriteRoom room={mockOffer} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Premium/i)).toBeInTheDocument();
  });
});
