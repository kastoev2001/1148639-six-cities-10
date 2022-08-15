import { store } from '../store/index';
import { LocationCity, Offers } from '../types/offers';


export type State = {
	activeCity: LocationCity,
	offers: Offers,
	isDataLoaded: boolean,
};

export type AppDispatch = typeof store.dispatch;
