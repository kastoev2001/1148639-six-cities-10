import ListFavoriteRoomsCity from './list-favorite-rooms-city';

import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../../const';
import { divideRoomsByCityName } from '../../../utils/offers';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';

const mockOffers = getFakeOffers();
const cities = divideRoomsByCityName(mockOffers);
const city = cities[0];
const mockStore = configureMockStore();

describe('Component: ListFavoriteRoomsCity.', () => {
  it('Should render currently.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ListFavoriteRoomsCity city={city} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${city.name}`, 'i'))).toBeInTheDocument();
  });
});
