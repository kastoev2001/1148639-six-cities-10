import { createSlice } from '@reduxjs/toolkit';
import { FIRST_CITY } from '../../const';
import { Location } from '../../types/offers';
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
  },
});

export const { changeCity } = cityData.actions;
