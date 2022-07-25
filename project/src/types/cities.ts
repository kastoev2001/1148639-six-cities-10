export type Room = {
	id: number,
	title: string,
	price: number,
	isFavorite: boolean,
	isPremium: boolean,
	typeRoom: string,
	previewImage: string,
	rating: number,
}

export type City = {
	name: string,
	rooms: Room[],
}

export type Cities = City[];