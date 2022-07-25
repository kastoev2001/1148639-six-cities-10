import ListFavoriteRoomsCity from '../list-favorite-rooms-city/list-favorite-rooms-city';

import { Offers, Offer } from '../../../types/offers';
import { Cities, Room, City } from '../../../types/cities';

type ListFavoriteProps = {
	offers: Offers,
};

type DivideRoomsOnCities = (offers: Offers) => Cities;

const divideRoomsOnCities: DivideRoomsOnCities = (offers: Offers): Cities => {
	const citiesName = offers.map((offer: Offer): string => offer.city.name)
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
				typeRoom: offer.typeRoom,
				previewImage: offer.previewImage,
				rating: offer.rating,
			}))
	}));

	return cities;
}

function ListFavorite({ offers }: ListFavoriteProps): JSX.Element {
	const cities = divideRoomsOnCities(offers)

	return (
		<ul className="favorites__list">
			{cities.map((city) => <ListFavoriteRoomsCity city={city} />)}
		</ul>
	);
}

export default ListFavorite;