import { date, datatype, internet, name, random, address, image } from 'faker';
import { AuthData } from '../types/auth-data';
import { UserEmail } from '../types/state';

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
  new Array(10).fill(null).map((_arg, index: number) => ({
    bedrooms: datatype.number(5),
    city: {
      location: {
        latitude: datatype.number(),
        longitude: datatype.number(),
        zoom: datatype.number(10),
      },
      name: address.cityName(),
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
