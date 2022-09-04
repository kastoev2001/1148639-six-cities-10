import ListCities from './list-cities';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus, CITIES } from '../../../const';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

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


    const cityLinks = screen.getAllByRole('link');
    const isCityAction = cityLinks.some((link) => link.classList.contains(activeCityClass));

    expect(isCityAction).toBe(true);
    expect(screen.getByText(new RegExp(`${firstCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${secondCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${thirdCity}`, 'i'))).toBeInTheDocument();
  });

  it('Should shange sort by city when user click city link.', async () => {
    const activeCityClass = 'tabs__item--active';
    const [firstCity, secondCity, thirdCity] = CITIES;
    const onCity = jest.fn();
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <ListCities activeCity={firstCity} onCity={onCity} />
        </BrowserRouter>
      </Provider>
    );

    const cityElement = screen.getByText(new RegExp(`${thirdCity}`, 'i'));

    await userEvent.click(cityElement);

    expect(onCity).toBeCalled();
    expect(onCity).nthCalledWith(1, thirdCity);

    const cityLinks = screen.getAllByRole('link');
    const isCityAction = cityLinks.some((link) => link.classList.contains(activeCityClass));

    expect(isCityAction).toBe(true);
    expect(screen.getByText(new RegExp(`${firstCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${secondCity}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${thirdCity}`, 'i'))).toBeInTheDocument();
  });
});
