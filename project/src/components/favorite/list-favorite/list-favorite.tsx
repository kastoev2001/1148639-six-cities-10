import ListFavoriteRoomsCity from '../list-favorite-rooms-city/list-favorite-rooms-city';

import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Offers, Offer } from '../../../types/offers';
import { Cities, Room, City } from '../../../types/cities';

type ListFavoriteProps = {
  offers: Offers,
};

type DivideRoomsByCityName = (offers: Offers) => Cities;

const divideRoomsByCityName: DivideRoomsByCityName = (offers: Offers): Cities => {
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

function ListFavorite({ offers }: ListFavoriteProps): JSX.Element {
  const cities = divideRoomsByCityName(offers);

  return (
    cities.length ?
      <ul className="favorites__list">
        {cities.map((city) => <ListFavoriteRoomsCity key={city.name} city={city} />)}
      </ul> :
      <Navigate to={AppRoute.NotFavorites} />
  );
}

export default ListFavorite;
