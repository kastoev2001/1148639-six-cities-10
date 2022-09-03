import ListRooms from './list-rooms';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockStore = configureMockStore();

describe('Component: ListRooms', () => {
  it('Should render currently', () => {
    const [firstOffer, secondOffer, thirdOffer] = mockOffers;
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <ListRooms offersFiltred={mockOffers} onCardRoomActive={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${firstOffer.title}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${secondOffer.title}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${thirdOffer.title}`, 'i'))).toBeInTheDocument();
  });
});
