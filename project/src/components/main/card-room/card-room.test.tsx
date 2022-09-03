import CardRoom from './card-room';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus, ButtonFavoriteConfig } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[0];

const mockStore = configureMockStore();

describe('Component: cardRoom', () => {
  it('Should render currently', () => {
    const buttonCardClass = `${ButtonFavoriteConfig.Card.className}-button`;
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <CardRoom offer={mockOffer} onCardRoomActive={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('button').classList.contains(buttonCardClass)).toBe(true);
    expect(screen.getByText(/Premium/i)).toBeInTheDocument();

  });
});
