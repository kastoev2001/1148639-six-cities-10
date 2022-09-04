import SortForm from './sort-form';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortType } from '../../../const';
import userEvent from '@testing-library/user-event';


const mockStore = configureMockStore();

describe('Component: SortForm', () => {
  it('Should render currently', () => {
    const activeSortClass = 'places__option--active';
    const store = mockStore({
      main: { currentSortType: SortType.PriceHighToLow },
    });

    render(
      <Provider store={store} >
        <SortForm />
      </Provider>
    );

    const PriceHighToLows = screen.getAllByText(new RegExp(`${SortType.PriceHighToLow}`, 'i'));
    const isActivePriceHighToLow = PriceHighToLows

      .some((element) => element.classList.contains(activeSortClass));

    expect(isActivePriceHighToLow).toBe(true);
  });

  it('Should open list sort type when user click by current sort.', async () => {
    const activeSortClass = 'places__option--active';
    const activeListSortTypeClass = 'places__options--opened';
    const store = mockStore({
      main: { currentSortType: SortType.PriceHighToLow },
    });

    render(
      <Provider store={store} >
        <SortForm />
      </Provider>
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
