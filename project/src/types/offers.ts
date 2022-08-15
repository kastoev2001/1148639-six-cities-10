export type Owner = {
	avatarUrl: string,
	id: number,
	isPro: boolean,
	name: string,
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
	id: number,
	bedrooms: number,
	title: string,
	isFavorite: boolean,
	price: number,
	isPremium: boolean,
	typeRoom: string,
	rating: number,
	images: string[],
	city: LocationCity,
	location: Location,
	owner: Owner,
	maxAdults: number,
	previewImage: string,
	description: string,
};

export type Offers = Offer[] | [];
