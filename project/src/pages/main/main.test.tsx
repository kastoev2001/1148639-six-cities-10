import Main from './main';

import userEvent from '@testing-library/user-event';

import { render, screen } from '../../utils/test-router';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../utils/mocks';
import { AppRoute, AuthorizationStatus, SortType } from '../../const';

const mockOffers = getFakeOffers();
const mockStore = configureMockStore();

describe('Component: Main.', () => {
  it('Should render currently.', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { activeCity: 'Paris' },
      main: { currentSortType: SortType.Popular },
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });

  it('Should redirect by page "favorites" when user click by link avatar.', async () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { activeCity: 'Paris' },
      main: { currentSortType: SortType.Popular },
    });

    render(
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Root} element={<Main />} />
          <Route path={AppRoute.Favorites} element={<p>Page is Favorites</p>} />
        </Routes>
      </Provider>,
      [AppRoute.Root]
    );

    const avatarElement = screen.getByTestId('avatar');

    expect(avatarElement).toBeInTheDocument();
    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();

    await userEvent.click(avatarElement);

    expect(screen.getByText(/Page is Favorites/i)).toBeInTheDocument();
  });

  it('Should change city then user click by the sort.', async () => {
    const activeSortClass = 'places__option--active';
    const activeListSortTypeClass = 'places__options--opened';
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers, isOffersLoaded: false },
      city: { activeCity: 'Paris' },
      main: { currentSortType: SortType.PriceHighToLow },
    });

    render(
      <Provider store={store}>
        <Main />
      </Provider>,
    );

    const [firstCurrentSortTypeElement, lastCurrentSortTypeElement] = screen.getAllByText(new RegExp(`${SortType.PriceHighToLow}`, 'i'));
    const sortTypePopularElement = screen.getByText(new RegExp(`${SortType.Popular}`, 'i'));
    const listSortTypeElement = screen.getByTestId(/list-sort-type/i);
    const isActiveCurrentSortType = lastCurrentSortTypeElement.classList.contains(activeSortClass);
    let isActiveListSortType = listSortTypeElement.classList.contains(activeListSortTypeClass);

    expect(isActiveListSortType).toBe(false);
    expect(isActiveCurrentSortType).toBe(true);

    await userEvent.click(firstCurrentSortTypeElement);

    isActiveListSortType = listSortTypeElement.classList.contains(activeListSortTypeClass);
    expect(isActiveListSortType).toBe(true);


    await userEvent.click(sortTypePopularElement);

    isActiveListSortType = listSortTypeElement.classList.contains(activeListSortTypeClass);
    expect(isActiveListSortType).toBe(false);
  });
});
