import SortForm from './sort-form';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { SortType } from '../../../const';


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

    const isActivePriceHighToLow = screen.getAllByText(new RegExp(`${SortType.PriceHighToLow}`, 'i'))
      .some((element) => element.classList.contains(activeSortClass));

    expect(isActivePriceHighToLow).toBe(true);
  });
});
