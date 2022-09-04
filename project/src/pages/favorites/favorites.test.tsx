import Favorites from './favorites';

import { render } from '../../utils/test';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { getFakeOffers } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const mockOffers = getFakeOffers();

describe('Component: Favorites.', () => {
  const store = mockStore({
    favorites: { favoriteOffers: mockOffers, isFavoriteOffersLoaded: false },
    offers: { offers: mockOffers, isOffersLoaded: false },
    user: { authorizationStatus: AuthorizationStatus.Auth },
  });
  it('Should render currently.', () => {
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );
  });
});
