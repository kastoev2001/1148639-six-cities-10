import MainMap from '../components/main-map/main-map';
import useMap from './use-map';

import { Provider } from 'react-redux';
import { render, screen, renderHook } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../utils/mocks';
import { MutableRefObject } from 'react';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[2];

const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('Should render currently', async () => {
    const activeCardRoomId = 2;
    const location = mockOffer.city.location;
    const store = mockStore({
      offers: { offers: mockOffers },
      city: { activeCity: 'Paris' },
    });

    render(
      <Provider store={store} >
        <MainMap activeCardRoomId={activeCardRoomId} offers={mockOffers} />
      </Provider>
    );

    const mapRef: MutableRefObject<HTMLDivElement> = {
      current: screen.getByTestId('map-container'),
    };
    const { result } = renderHook(() => useMap(mapRef, location));

    const map = await result.current as null;

    expect(map).toBeNull();
  });
});
