import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { LocationCity, Offers } from '../types/offers';

export type UserEmail = string | null;

export type State = {
  activeCity: LocationCity,
  offers: Offers,
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  userEmail: UserEmail,
};

export type AppDispatch = typeof store.dispatch;
