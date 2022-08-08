import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { changeCity } from './action';
import { State } from '../types/state';
import  { LocationCity } from '../types/offers';

export const FIRST_CITY: LocationCity = offers[0].city;

const initialState: State = {
	activeCity: FIRST_CITY,
	offers: offers
}

export const reducer = createReducer(initialState, (builder) => {
	builder.addCase(changeCity, (state, action) => {
		state.activeCity = action.payload.city;
	});
});
