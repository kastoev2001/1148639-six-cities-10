import { getFakeOffersSortedPriceHighToLow, getFakeOffersSortedPriceLowToHigh, getFakeOffersSortTopRatedFirst, getFakeOffersForSorting } from '../mocks';
import { sortOffers } from './offers';
import { SortType } from '../../const';

const MockOffersForSorting = getFakeOffersForSorting();
const mokeOffersSortedPriceHighToLow = getFakeOffersSortedPriceHighToLow();
const mokeOffersSortedPriceLowToHigh = getFakeOffersSortedPriceLowToHigh();
const mokeOffersSortTopRatedFirst = getFakeOffersSortTopRatedFirst();

describe('Business logic: manipulation with offers.', () => {
  it('Should sorting offers high to low.', () => {
    expect(sortOffers(SortType.PriceHighToLow, MockOffersForSorting))
      .toEqual(mokeOffersSortedPriceHighToLow);
  });

  it('Should sorting offers low to high.', () => {
    expect(sortOffers(SortType.PriceLowToHigh, MockOffersForSorting))
      .toEqual(mokeOffersSortedPriceLowToHigh);
  });

  it('Should sorting offers top rated first.', () => {
    expect(sortOffers(SortType.TopRatedFirst, MockOffersForSorting))
      .toEqual(mokeOffersSortTopRatedFirst);
  });
});
