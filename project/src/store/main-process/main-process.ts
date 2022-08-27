import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortType } from '../../const';

type InitialState = {
	currentSortType: SortType,
};

const initialState: InitialState = {
	currentSortType: SortType.Popular,
}

export const mainProcess = createSlice({
	name: NameSpace.Main,
	initialState,
	reducers: {
		changeSortType: (state, action) => {
			const changedSortType: SortType = action.payload;
			
			state.currentSortType = changedSortType;
		}
	},
});

export const { changeSortType } = mainProcess.actions;