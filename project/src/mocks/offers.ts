import { Offers } from '../types/offers';

export const offers: Offers = [
	{
		id: 1,
		title: 'Beautiful & luxurious apartment at great location',
		price: 120,
		image: '/img/apartment-01.jpg',
		isFavorite: false,
		isPremium: true,
		typeRoom: 'Apartment',
		rating: 4,
	},
	{
		id: 2,
		title: 'Wood and stone place',
		price: 80,
		image: '/img/room.jpg',
		isFavorite: true,
		isPremium: false,
		typeRoom: 'Private room',
		rating: 4,
	},
	{
		id: 3,
		title: 'Canal View Prinsengracht',
		price: 132,
		image: '/img/apartment-02.jpg',
		isFavorite: false,
		isPremium: false,
		typeRoom: 'Apartment',
		rating: 4,
	},
	{
		id: 4,
		title: 'Nice, cozy, warm big bed apartment',
		price: 180,
		image: '/img/apartment-03.jpg',
		isFavorite: false,
		isPremium: true,
		typeRoom: 'Apartment',
		rating: 4,
	},
];