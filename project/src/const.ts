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

export const RatingStatus = {
  1: 'terribly',
  2: 'badly',
  3: 'not bad',
  4: 'good',
  5: 'perfect',
};

export const FIRST_STATE_RATING = 0;
export const MAX_GALLERY_IMAGES = 6;

export const CURRENT_CUSTOM_ICON = new Icon({
  iconUrl: './img/pin.svg',
  iconSize: [27, 39],
});

export const ACTIVE_CUSTOM_ICON = new Icon({
  iconUrl: './img/pin-active.svg',
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
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export const FIRST_CITY: LocationCity = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13
  }
};

export enum NameSpace {
  Comments = 'comments',
  Offer = 'offer',
  Offers = 'offers',
  City = 'city',
  User = 'user',
  NearbyOffers = 'nearbyOffers',
  Main = 'main',
  NewComment = 'newComment',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export const CommentLength = {
  MAX: 300,
  MIN: 50,
};
