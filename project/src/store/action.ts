import { createAction } from '@reduxjs/toolkit';
import { LocationCity } from '../types/offers';

export const changeCity = createAction<{ city: LocationCity }>('main/changeCity');
export const changeListOffers = createAction('main/changeListOffers');
