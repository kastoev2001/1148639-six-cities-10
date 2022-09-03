import MainMap from './main-map';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../utils/mocks';

const mockOffers = getFakeOffers();


const mockStore = configureMockStore();

describe('Component: MainMap', () => {
  it('Should render currently', () => {
    const activeCardRoomId = 2;
    const store = mockStore({
      offers: { offers: mockOffers },
      city: { activeCity: 'Paris' },
    });

    render(
      <Provider store={store} >
        <MainMap offers={mockOffers} activeCardRoomId={activeCardRoomId} />
      </Provider>
    );

    const mapContainerElement = screen.getByTestId('map-container');

    expect(mapContainerElement).toBeInTheDocument();
  });
});
