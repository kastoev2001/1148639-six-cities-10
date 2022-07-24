import { Offers } from '../types/offers';

export const offers: Offers = [
	{
		id: 1,
		title: 'Beautiful & luxurious apartment at great location',
		price: 120,
		previewImage: '/img/apartment-01.jpg',
		isFavorite: false,
		isPremium: true,
		typeRoom: 'Apartment',
		rating: 4,
		city: {
			name: 'Paris',
			location: {
				latitude: 43.36266826708066,
				longitude: 44.06520836645309,
				zoom: 3,
			},
		},
		owner: {
			avatarUrl: './img/avatar-angelina.jpg',
			id: 1,
			isPro: true,
			name: 'Azamat',
		},
		maxAdults: 4,
		images: [
'img/room.jpg',
'img/apartment-01.jpg',
'img/apartment-03.jpg',
'img/studio-01.jpg',
'img/apartment-01.jpg'],
		location: {
			latitude: 163.36266826708066,
			longitude: 114.06520836645309,
			zoom: 3,
		}
	},
	{
		id: 2,
		title: 'Wood and stone place',
		price: 80,
		previewImage: '/img/room.jpg',
		isFavorite: true,
		isPremium: false,
		typeRoom: 'Private room',
		rating: 4,
		city: {
			name: 'Paris',
			location: {
				latitude: 123.36266826708066,
				longitude: 66.06520836645309,
				zoom: 3,
			},
		},
		owner: {
			avatarUrl: './img/avatar-angelina.jpg',
			id: 1,
			isPro: true,
			name: 'Azamat',
		},
		maxAdults: 4,
		images: [
'img/room.jpg',
'img/apartment-01.jpg',
'img/apartment-03.jpg',
'img/studio-01.jpg',
'img/apartment-01.jpg'],
		location: {
			latitude: 61.36266826708066,
			longitude: 34.06520836645309,
			zoom: 3,
		}
	},
	{
		id: 3,
		title: 'Canal View Prinsengracht',
		price: 132,
		previewImage: '/img/apartment-02.jpg',
		isFavorite: false,
		isPremium: false,
		typeRoom: 'Apartment',
		rating: 4,
		city: {
			name: 'Paris',
			location: {
				latitude: 12.36266826708066,
				longitude: 64.06520836645309,
				zoom: 3,
			},
		},
		owner: {
			avatarUrl: './img/avatar-angelina.jpg',
			id: 1,
			isPro: true,
			name: 'Azamat',
		},
		maxAdults: 4,
		images: [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/apartment-01.jpg'
  ],
		location: {
			latitude: 53.36266826708066,
			longitude: 34.06520836645309,
			zoom: 3,
		}
	},
	{
		id: 4,
		title: 'Nice, cozy, warm big bed apartment',
		price: 180,
		previewImage: '/img/apartment-03.jpg',
		isFavorite: false,
		isPremium: true,
		typeRoom: 'Apartment',
		rating: 4,
		city: {
			name: 'Paris',
			location: {
				latitude: 33.36266826708066,
				longitude: 144.06520836645309,
				zoom: 3,
			},
		},
		owner: {
			avatarUrl: './img/avatar-angelina.jpg',
			id: 1,
			isPro: true,
			name: 'Azamat',
		},
		maxAdults: 4,
		images: [
    'img/room.jpg',
    'img/apartment-01.jpg',
    'img/apartment-03.jpg',
    'img/studio-01.jpg',
    'img/apartment-01.jpg'
  ],
		location: {
			latitude: 13.36266826708066,
			longitude: 54.06520836645309,
			zoom: 3,
		}
	},
];

