import dayjs from 'dayjs';

import { Map, Layer } from 'leaflet';
import { AuthorizationStatus, CommentLength, SortType } from '../const';
import { toast } from 'react-toastify';
import { Offers, Offer } from '../types/offers';
import { Cities, Room, City } from '../types/cities';
import { Comment } from '../types/comments';

type DefineRating = (rating: number) => number;

const isLoginCheck = (loginElement: HTMLInputElement): boolean =>
  /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(loginElement.value);

const isPasswordCheck = (passwordElement: HTMLInputElement): boolean =>
  /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(passwordElement.value);

const offersSortHighTolow = (offerA: Offer, offerB: Offer): number =>
	offerB.price - offerA.price;

const offersSortLowToHigh = (offerA: Offer, offerB: Offer): number =>
	offerA.price - offerB.price;

const offersSortTopRatedFirst = (offerA: Offer, offerB: Offer): number =>
	offerB.rating - offerA.rating;

export const removeMarkers = (map: Map, markers: Layer[]): void => (
  markers.forEach((layer: Layer): void => {
    map.removeLayer(layer);
  })
);

export const commentsSortHighTolow = (commentA: Comment, commentB: Comment): number => {
	const dateA = dayjs(commentA.date);
	const dateb = dayjs(commentB.date);

	if (dateb > dateA) {
		return 1;
	}

	if (dateb < dateA) {
		return -1
	}

	return 0;
};

export const defineRating: DefineRating = (rating): number => {
  const definedRating = (rating / 5) * 100;

  return definedRating;
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const checkLoginFormValidity = (loginElement: HTMLInputElement, passwordElement: HTMLInputElement): boolean => {
  const isCheckedLogin = isLoginCheck(loginElement);
  const isPasswordLogin = isPasswordCheck(passwordElement);
  let errorCount = 0;

  if (!isCheckedLogin) {
    const loginErrorMessage = 'Wrong login!';

    toast.error(loginErrorMessage);

    errorCount++;
  }

  if (!isPasswordLogin) {
    const passwordErrorMessage = 'Wrong password!';

    toast.error(passwordErrorMessage);

    errorCount++;
  }

  return !errorCount;
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

export const checkNewCommentValidity = (commentText: string, rating: number): number => {
  let errorCount = 0;

  if (commentText.length < CommentLength.MIN || commentText.length > CommentLength.MAX) {
    errorCount++;
  }

  if (!rating) {
    errorCount++;
  }

  return errorCount;
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
