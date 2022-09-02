import { mainProcess, changeSortType } from './main-process';
import { SortType } from '../../const';

describe('Reducer: mainProcess.', () => {
	it('Should update propety currentSortType.', () => {
		const state = { currentSortType: SortType.Popular };
		
		expect(mainProcess.reducer(state, changeSortType(SortType.PriceHighToLow)))
			.toEqual({ currentSortType: SortType.PriceHighToLow });

		expect(mainProcess.reducer(state, changeSortType(SortType.PriceLowToHigh)))
			.toEqual({ currentSortType: SortType.PriceLowToHigh });
	});
});
