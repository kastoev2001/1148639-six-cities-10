export type Host = {
  avatarUrl: string
  id: number
  isPro: boolean
  name: string
};

export type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
};

export type LocationCity = {
  location: Location,
  name: string,
};

export type Offer = {
  bedrooms: number,
  city: LocationCity,
  description: string,
  goods: string[],
  host: Host,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
};

export type Offers = Offer[] | [];
