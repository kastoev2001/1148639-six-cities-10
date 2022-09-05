import ListFavoriteRoomsCity from './list-favorite-rooms-city';

import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { divideRoomsByCityName } from '../../../utils/offers/offers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import userEvent from '@testing-library/user-event';

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

  it('Should redirect by page "Main" when user click by link City.', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoute.Root} element={<p>Page is Main</p>} />
          </Routes>
          <ListFavoriteRoomsCity city={city} />
        </BrowserRouter>
      </Provider>
    );


    expect(screen.getByText(new RegExp(`${city.name}`, 'i'))).toBeInTheDocument();

    await userEvent.click(screen.getByText(new RegExp(`${city.name}`, 'i')));

    expect(screen.getByText(/Page is Main/i)).toBeInTheDocument();
  });

});
