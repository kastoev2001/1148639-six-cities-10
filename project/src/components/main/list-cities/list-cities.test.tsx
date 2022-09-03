import ListCities from './list-cities';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus, CITIES } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockStore = configureMockStore();

describe('Component: ListCities', () => {
  it('Should render currently', () => {
    const activeCityClass = 'tabs__item--active';
    const [firstCity, secondCity, thirdCity] = CITIES;
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <ListCities activeCity={firstCity} onCity={jest.fn()} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${firstCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${secondCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${thirdCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getAllByRole('link').some((link) => link.classList.contains(activeCityClass))).toBe(true);
  });
});
