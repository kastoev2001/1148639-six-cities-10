import Auth from './auth';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { render, screen } from '@testing-library/react';
import { getFakeUserEmail, getFakeOffers } from '../../utils/mocks';

const mockStore = configureMockStore();
const mockUserEmail = getFakeUserEmail();
const mockOffers = getFakeOffers();

describe('Component: Auth.', () => {
	it('Should render SignOut', () => {
		const store = mockStore({
			user: {authorizationStatus: AuthorizationStatus.Auth, userEmail: mockUserEmail},
			offers: {offers: mockOffers}
		})

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Auth />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(new RegExp(`${mockUserEmail}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
	});

	it('Should render SignIn', () => {
		const store = mockStore({
			user: {authorizationStatus: AuthorizationStatus.NoAuth},
		})

		render(
			<Provider store={store}>
				<BrowserRouter>
					<Auth />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
	});
});