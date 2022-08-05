import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';
import { Offers } from '../types/offers';

type InitialState = {
	city: string,
	offers: Offers
}

const FIRST_CITY = offers[0].city.name;
const initialState: InitialState = {
	city: FIRST_CITY,
	offers: offers
}

export const reducer = createReducer(initialState, (builder) => {});