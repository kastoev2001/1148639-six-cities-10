import SignOut from './sign-out';

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeUserEmail, getFakeOffers } from '../../utils/mocks';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const mockUserEmail = getFakeUserEmail();
const mockOffers = getFakeOffers();

describe('Component: SignOut.', () => {
  it('Should render correctly', () => {
    const store = mockStore({
      user: { userEmail: mockUserEmail },
      offers: { offers: mockOffers }
    });


    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignOut />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${mockUserEmail}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
