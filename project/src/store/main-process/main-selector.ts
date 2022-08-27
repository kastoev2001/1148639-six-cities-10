import { State } from '../../types/state';

export const getCurrentSortType = (state: State) =>
	state.main.currentSortType;