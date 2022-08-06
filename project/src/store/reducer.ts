import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { Offers } from '../types/offers';
import { FIRST_CITY } from '../const';

type InitialState = {
	activeCity: string,
	offers: Offers
}

const initialState: InitialState = {
	activeCity: FIRST_CITY,
	offers: offers
}

export const reducer = createReducer(initialState, (builder) => { });