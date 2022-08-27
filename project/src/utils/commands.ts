import { Map, Layer } from 'leaflet';
import { AuthorizationStatus } from '../const';
import { toast } from 'react-toastify';
import { SortType } from '../const';
import { Offers, Offer, LocationCity } from '../types/offers';

type DefineRating = (rating: number) => number;

const isLoginCheck = (loginElement: HTMLInputElement): boolean =>
  /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(loginElement.value);

const isPasswordCheck = (passwordElement: HTMLInputElement): boolean =>
  /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(passwordElement.value);

export const defineRating: DefineRating = (rating): number => {
  const definedRating = (rating / 5) * 100;

  return definedRating;
};

const sortHighTolow = (offerA: Offer, offerB: Offer): number =>
	offerB.price - offerA.price;

const sortLowToHigh = (offerA: Offer, offerB: Offer): number =>
	offerA.price - offerB.price;

const sortTopRatedFirst = (offerA: Offer, offerB: Offer): number =>
	offerB.rating - offerA.rating;

export const removeMarkers = (map: Map, markers: Layer[]): void => (
  markers.forEach((layer: Layer): void => {
    map.removeLayer(layer);
  })
);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const isFormCheck = (loginElement: HTMLInputElement, passwordElement: HTMLInputElement): boolean => {
  const isCheckedLogin = isLoginCheck(loginElement);
  const isPasswordLogin = isPasswordCheck(passwordElement);
  let errorCount = 0;

  if (!isCheckedLogin) {
    const loginError = 'Wrong login!';

    toast.error(loginError);

    errorCount++;
  }

  if (!isPasswordLogin) {
    const passwordError = 'Wrong password!';

    toast.error(passwordError);

    errorCount++;
  }

  return !errorCount;
};

export const filterOffersByCity = (city: LocationCity, offers: Offers): Offers => (
  offers.filter((offer: Offer): boolean => offer.city.name === city.name)
);

export const sortOffers = (sortType: SortType, offers: Offers): Offers => {
	switch (sortType) {
		case SortType.PriceHighToLow:
			return offers.sort(sortHighTolow);
		case SortType.PriceLowToHigh:
			return offers.sort(sortLowToHigh);
		case SortType.TopRatedFirst:
			return offers.sort(sortTopRatedFirst);
		default:
			return offers;
	}
};
