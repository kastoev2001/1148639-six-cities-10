import { store } from '../store/index';
import { Offer } from '../types/offers';

export type UserEmail = string | null;
export type ActiveOffer = Offer | null;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
