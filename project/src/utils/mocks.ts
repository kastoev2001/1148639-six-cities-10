import { date, datatype, internet, name, random, address, image } from 'faker';
import { AuthData } from '../types/auth-data';
import { UserEmail } from '../types/state';
import { getRundomCity } from './city/city';
import { Map, TileLayer, MapOptions, LayerOptions, Marker, LatLngLiteral, Layer } from 'leaflet';
import { Location, Offer, Offers } from '../types/offers';
import { CURRENT_CUSTOM_ICON } from '../const';

export const getFakeComments = () =>
  new Array(7).fill(null).map((_arg, index: number) => ({
    comment: random.words(10),
    date: date.soon().toDateString(),
    id: ++index,
    rating: datatype.number(5),
    user: {
      avatarUrl: internet.avatar(),
      id: ++index,
      isPro: datatype.boolean(),
      name: name.title(),
    }
  }));


export const getFakeOffers = () =>
  new Array(25).fill(null).map((_arg, index: number) => ({
    bedrooms: datatype.number(5),
    city: {
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(10),
      },
      name: getRundomCity(),
    },
    description: random.words(25),
    goods: new Array(4).fill(null).map(() => random.word()),
    host: {
      avatarUrl: internet.avatar(),
      id: ++index,
      isPro: datatype.boolean(),
      name: name.title(),
    },
    id: ++index,
    images: new Array(8).fill(null).map(() => `${Math.random()}${image.image()}`),
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: datatype.number(10),
    },
    maxAdults: datatype.number(5),
    previewImage: image.image(),
    price: datatype.number(100),
    rating: datatype.number(5),
    title: random.words(15),
    type: random.word(),
  }));

export const getFakeUserEmail = (): UserEmail =>
  internet.email();

export const getFakeNewComment = () => ({
  comment: random.words(25),
  rating: datatype.number(5),
});

export const getFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: `${random.words(2)}${datatype.number(10)}`
});

export const getFakeFixedComments = () => ([
  {
    comment: 'TestingLibraryElementError: Unable to find an element b',
    date: 'Thu Oct 04 2001 00:00:00 GMT+0400',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'Azamat',
      id: 1,
      isPro: true,
      name: 'Ashab',
    }
  },
  {
    comment: 'TestingLibraryElementError: Unable to find an element b',
    date: 'Thu Oct 05 2001 00:00:00 GMT+0400',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'Azamat',
      id: 1,
      isPro: true,
      name: 'Ashab',
    }
  },
]);

export const getFakeFixedSortedComments = () => ([
  {
    comment: 'TestingLibraryElementError: Unable to find an element b',
    date: 'Thu Oct 05 2001 00:00:00 GMT+0400',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'Azamat',
      id: 1,
      isPro: true,
      name: 'Ashab',
    }
  },
  {
    comment: 'TestingLibraryElementError: Unable to find an element b',
    date: 'Thu Oct 04 2001 00:00:00 GMT+0400',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'Azamat',
      id: 1,
      isPro: true,
      name: 'Ashab',
    }
  },
]);

export const getFakeMap = () => {
  const wrapperElement: HTMLDivElement = document.createElement('div');
  const mockOffers = getFakeOffers();
  const mockOffer = mockOffers[0];
  const city = mockOffer.city;
  const mapOptions: MapOptions = {
    center: {
      lat: 43.28148942161262,
      lng: 44.58390266047618,
    },
    zoom: 7
  };
  const templateUrlLayer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  const layerOptions: LayerOptions = {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  };
  const markers: Layer[] = [];
  const customIcon = CURRENT_CUSTOM_ICON;
  const map = new Map(wrapperElement, mapOptions);
  const layer = new TileLayer(templateUrlLayer, layerOptions);

  map.addLayer(layer);
  mockOffers.forEach((offer) => {
    const { latitude, longitude, zoom } = city.location;
    const location: Location = offer.location;
    const markerOptions: LatLngLiteral = {
      lat: location.latitude,
      lng: location.longitude,
    };
    const marker = new Marker(markerOptions);

    markers.push(marker);

    marker.setIcon(customIcon);

    map.flyTo({ lat: latitude, lng: longitude }, zoom);
    marker.addTo(map);
  });
  return {
    markers,
    map,
  };
};

const ratings = [2, 3, 4, 1, 5];
const prices = [62, 11, 32, 35, 51];

export const getFakeOffersForSorting = (): Offers => prices
  .map((_, index: number): Offer => (
    {
      id: ++index,
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: 'Amsterdam'
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating'
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: ++index,
        isPro: true,
        name: 'Angelina'
      },
      images: [
        'img/1.png'
      ],
      isFavorite: true,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      maxAdults: 4,
      previewImage: 'img/1.png',
      price: prices[index],
      rating: ratings[index],
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment'
    }
  ));

export const getFakeOffersSortedPriceHighToLow = () => [...prices
  .map((_, index: number): Offer => (
    {
      id: ++index,
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: 'Amsterdam'
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating'
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: ++index,
        isPro: true,
        name: 'Angelina'
      },
      images: [
        'img/1.png'
      ],
      isFavorite: true,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      maxAdults: 4,
      previewImage: 'img/1.png',
      price: prices[index],
      rating: ratings[index],
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment'
    }
  ))
  .sort((a: Offer, b: Offer): number => b.price - a.price)];

export const getFakeOffersSortedPriceLowToHigh = () => [...prices
  .map((_, index: number): Offer => (
    {
      id: ++index,
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: 'Amsterdam'
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating'
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: ++index,
        isPro: true,
        name: 'Angelina'
      },
      images: [
        'img/1.png'
      ],
      isFavorite: true,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      maxAdults: 4,
      previewImage: 'img/1.png',
      price: prices[index],
      rating: ratings[index],
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment'
    }
  ))
  .sort((a: Offer, b: Offer): number => a.price - b.price)];

export const getFakeOffersSortTopRatedFirst = (): Offers => [...prices
  .map((_, index: number): Offer => (
    {
      id: ++index,
      bedrooms: 3,
      city: {
        location: {
          latitude: 52.370216,
          longitude: 4.895168,
          zoom: 10
        },
        name: 'Amsterdam'
      },
      description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      goods: [
        'Heating'
      ],
      host: {
        avatarUrl: 'img/1.png',
        id: ++index,
        isPro: true,
        name: 'Angelina'
      },
      images: [
        'img/1.png'
      ],
      isFavorite: true,
      isPremium: false,
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8
      },
      maxAdults: 4,
      previewImage: 'img/1.png',
      price: prices[index],
      rating: ratings[index],
      title: 'Beautiful & luxurious studio at great location',
      type: 'apartment'
    }
  ))
  .sort((a, b) => b.rating - a.rating)];
