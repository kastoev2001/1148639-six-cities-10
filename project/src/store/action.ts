import { createAction } from '@reduxjs/toolkit';
import { LocationCity, Offers } from '../types/offers';

export const changeCity = createAction<{ city: LocationCity }>('main/changeCity');
export const changeListOffers = createAction('main/changeListOffers');
export const loadOffers = createAction<Offers>('data/loadOffers');
export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');
