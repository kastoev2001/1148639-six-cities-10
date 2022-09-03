import ListFavorite from './list-favorite';

import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { getFakeOffers } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../../const';
import { BrowserRouter } from 'react-router-dom';
import { divideRoomsByCityName } from '../../../utils/offers';

const mockOffers = getFakeOffers();
const cities = divideRoomsByCityName(mockOffers);
const [firstCity, secondCity, thirdCity] = cities;
const mockStore = configureMockStore();

describe('Component: ListFavorite.', () => {
	it('Should render currently.', () => {
		const store = mockStore({
			user: {authorizationStatus: AuthorizationStatus.Auth},
		});
		
		render(
			<Provider store={store}>
				<BrowserRouter>
				<ListFavorite cities={cities}/>
				</BrowserRouter>
			</Provider>
		);
	
		expect(screen.getByText(new RegExp(`${firstCity.name}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(`${secondCity.name}`, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(`${thirdCity.name}`, 'i'))).toBeInTheDocument();
	});
});
