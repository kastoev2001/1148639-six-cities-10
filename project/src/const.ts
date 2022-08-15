import { LocationCity } from './types/offers';
import { Icon } from 'leaflet';

export enum AppRoute {
  Root = '/',
  Favorites = '/favorites',
  NotFavorites = '/not-favorites',
  Login = '/login',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CardStatus {
  ACTIVE = '0.6',
  NO_ACTIVE = '1',
}

export enum RatingStatus {
  PERFECT = 5,
  GOOD = 4,
  NOT_BAD = 3,
  BADLY = 2,
  TERRIBLY = 1,
}

export const FIRST_STATE_RATING = 0;

export const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
});

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export enum APIRoute {
  Hotels = '/hotels',
}

export const FIRST_CITY: LocationCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};
