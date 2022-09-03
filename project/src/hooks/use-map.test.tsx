import MainMap from '../components/main-map/main-map';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {renderHook, act} from '@testing-library/react';
import { getFakeOffers } from '../utils/mocks';
import { MainMap } from 

const mockOffers = getFakeOffers();


const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('Should render currently', () => {
		const {result} = renderHook(() =>{

		})
		
		const activeCardRoomId = 2;
    const store = mockStore({
      offers: { offers: mockOffers },
      city: { activeCity: 'Paris' },
    });

    render(
      <Provider store={store} >
          <MainMap activeCardRoomId={activeCardRoomId} offers={mockOffers}/>
      </Provider>
    );

    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
  });
});
