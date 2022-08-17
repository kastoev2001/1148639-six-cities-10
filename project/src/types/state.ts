import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { LocationCity, Offers } from '../types/offers';


export type State = {
	activeCity: LocationCity,
	offers: Offers,
	isDataLoaded: boolean,
	authorizationStatus: AuthorizationStatus,
};

export type AppDispatch = typeof store.dispatch;
