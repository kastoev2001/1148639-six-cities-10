type Offer = {
	id: number,
	title: string,
	isFavorite: boolean,
	price: number,
	isPremium: boolean,
	typeRoom: string,
	rating: number,
	image: string,
};

export type Offers = Offer[];