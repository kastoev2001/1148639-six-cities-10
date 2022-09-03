import ListNearestRooms from './list-nearest-rooms';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockNearbyOffers = mockOffers.slice(3);


const mockStore = configureMockStore();

describe('Component: listNearestRooms', () => {
  it('Should render currently', () => {
    const [firstOffer, secondOffer, thirdOffer] = mockNearbyOffers;
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth }
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <ListNearestRooms nearbyOffers={mockNearbyOffers} />
        </BrowserRouter>
      </Provider>
    );

    const firstOfferElement = screen.getByText(new RegExp(`${firstOffer.title}`, 'i'));
    const secondOfferElement = screen.getByText(new RegExp(`${secondOffer.title}`, 'i'));
    const thirdOfferElement = screen.getByText(new RegExp(`${thirdOffer.title}`, 'i'));

    expect(firstOfferElement).toBeInTheDocument();
    expect(secondOfferElement).toBeInTheDocument();
    expect(thirdOfferElement).toBeInTheDocument();
  });
});
