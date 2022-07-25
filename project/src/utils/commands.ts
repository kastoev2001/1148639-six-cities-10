type DefineRating = (rating: number) => number;

export const defineRating: DefineRating = (rating) => {
	const definedRating = (rating / 5) * 100;

	return definedRating;
};