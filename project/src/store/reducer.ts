import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setDataLoadedStatus } from './action';
import { State } from '../types/state';
import { FIRST_CITY } from '../const';

const initialState: State = {
  activeCity: FIRST_CITY,
  offers: [],
  isDataLoaded: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload.city;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    });
});
