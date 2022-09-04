import NearestRoom from './nearest-room';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { AuthorizationStatus } from '../../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const nearbyOffer = mockOffers[2];

const mockStore = configureMockStore();

describe('Component: NearestRoom', () => {
  it('Should render currently', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.Auth },
      offers: { offers: mockOffers },
    });

    render(
      <Provider store={store} >
        <BrowserRouter>
          <NearestRoom nearbyOffer={nearbyOffer} />
        </BrowserRouter>
      </Provider>
    );

    const naerbyOfferElement = screen.getByText(new RegExp(`${nearbyOffer.title}`, 'i'));

    expect(naerbyOfferElement).toBeInTheDocument();

  });
});
