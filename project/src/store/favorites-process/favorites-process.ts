import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Offers } from '../../types/offers';

type InitialState = {
	favoriteOffers: Offers,
	favoriteOffersStatus: {
		isLoaded: boolean,
		isRejected: boolean,
		isSuccessed: boolean,
	}
}

const initialState: InitialState = {
	favoriteOffers: [],
	favoriteOffersStatus: {
		isLoaded: false,
		isRejected: false,
		isSuccessed: false,
	},
};

export const favoritesProcess = createSlice({
	name: NameSpace.Favorites,
	initialState,
	reducers: {},
});
