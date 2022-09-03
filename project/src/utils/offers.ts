import { Offers, Offer } from '../types/offers';
import { MAX_RATING, SortType } from '../const';
import { Cities, Room, City } from '../types/cities';

const offersSortHighTolow = (offerA: Offer, offerB: Offer): number =>
  offerB.price - offerA.price;

const offersSortLowToHigh = (offerA: Offer, offerB: Offer): number =>
  offerA.price - offerB.price;

const offersSortTopRatedFirst = (offerA: Offer, offerB: Offer): number =>
  offerB.rating - offerA.rating;

export const defineRating = (rating: number): number => {
  const definedRating = (rating / MAX_RATING) * 100;

  return definedRating;
};

export const filterOffersByCity = (city: string, offers: Offers): Offers => (
  offers.filter((offer: Offer): boolean => offer.city.name === city)
);

export const sortOffers = (sortType: SortType, offers: Offers): Offers => {
  switch (sortType) {
    case SortType.PriceHighToLow:
      return offers.sort(offersSortHighTolow);
    case SortType.PriceLowToHigh:
      return offers.sort(offersSortLowToHigh);
    case SortType.TopRatedFirst:
      return offers.sort(offersSortTopRatedFirst);
    default:
      return offers;
  }
};

export const replaceOffer = (offers: Offers, replaceableOffer: Offer): Offers => {
  const index = offers.findIndex((offer: Offer) => offer.id === replaceableOffer.id);

  if (~index) {
    const changedOffers = [...offers.slice(0, index), replaceableOffer, ...offers.slice(index + 1)];

    return changedOffers;
  }

  return offers;
};

export const removeOffer = (offers: Offers, removableOffer: Offer): Offers => {
  const index = offers.findIndex((offer: Offer) => offer.id === removableOffer.id);
  const removedOffers = [...offers.slice(0, index), ...offers.slice(index + 1)];

  return removedOffers;
};

export const divideRoomsByCityName = (offers: Offers): Cities => {
  const offersFiltred = offers.filter((offer: Offer): true | false => offer.isFavorite);

  if (!offersFiltred.length) {
    return [];
  }

  const citiesName = offersFiltred.map((offer: Offer): string => offer.city.name)
    .filter((cityName: string, index: number, arr: string[]): boolean => arr.indexOf(cityName) === index);

  const cities = citiesName.map((cityName: string): City => ({
    name: cityName[0].toUpperCase() + cityName.substring(1),
    rooms: offers
      .filter((offer: Offer): boolean => cityName === offer.city.name)
      .map((offer: Offer): Room => ({
        id: offer.id,
        title: offer.title,
        price: offer.price,
        isFavorite: offer.isFavorite,
        isPremium: offer.isPremium,
        type: offer.type,
        previewImage: offer.previewImage,
        rating: offer.rating,
      }))
  }));

  return cities;
};
