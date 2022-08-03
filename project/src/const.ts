import { City } from './types/offers';
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

export const locationCity: City = {
  location: {
    latitude: 52.36862421982035,
    longitude: 4.903369107744523,
    zoom: 10,
  },
  name: 'Amsterdam',
};

export const currentCustomIcon = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
});
