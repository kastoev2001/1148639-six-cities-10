import { createSlice } from '@reduxjs/toolkit';
import { FIRST_CITY } from '../../const';
import { NameSpace } from '../../const';

type InitialState = {
  activeCity: string,
};

const initialState: InitialState = {
  activeCity: FIRST_CITY
};

export const cityData = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      const city: string = action.payload;
      state.activeCity = city;
    },
    resetCity: (state) => {
      state.activeCity = FIRST_CITY;
    }
  },
});

export const { changeCity, resetCity } = cityData.actions;
