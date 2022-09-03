import Header from './header';

import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers, getFakeUserEmail } from '../../utils/mocks';
import { AuthorizationStatus } from '../../const';
import { BrowserRouter } from 'react-router-dom';

const mockOffers = getFakeOffers();
const mockUserEmail = getFakeUserEmail();


const mockStore = configureMockStore();

describe('Component: Header', () => {
	it('Should render currently', () => {
		const store = mockStore({
			user: { authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail },
			offers: { offers: mockOffers }
		})

		render(
			<Provider store={store} >
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();
	})
})