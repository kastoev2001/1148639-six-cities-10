import { Offers, Offer } from '../types/offers';

type DefineRating = (rating: number) => number;

export const defineRating: DefineRating = (rating): number => {
  const definedRating = (rating / 5) * 100;

  return definedRating;
};


export const filterOffersOnCity = (city: string, offers: Offers): Offer[] =>  (
	offers.filter((offer: Offer): boolean => offer.city.name === city)
);
