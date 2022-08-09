import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCity } from './action';
import { State } from '../types/state';
import { LocationCity } from '../types/offers';

const FIRST_CITY: LocationCity = {
  location: {
    latitude: 48.85730543802425,
    longitude: 2.3515636515566825,
    zoom: 10,
  },
  name: 'Paris',
};

const initialState: State = {
  activeCity: FIRST_CITY,
  offers: offers
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.activeCity = action.payload.city;
  });
});
