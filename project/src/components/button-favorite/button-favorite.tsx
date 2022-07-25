type ButtonFavoriteProps = {
	isFavorite?: boolean,
};

function ButtonFavorite({ isFavorite }: ButtonFavoriteProps): JSX.Element {
	const favoriteActiveClass = isFavorite
		? 'place-card__bookmark-button button place-card__bookmark-button--active button'
		: 'place-card__bookmark-button button';

	return (
		<button className={favoriteActiveClass} type="button">
			<svg className="place-card__bookmark-icon" width="18" height="19">
				<use xlinkHref="/#icon-bookmark"></use>
			</svg>
			<span className="visually-hidden">To bookmarks</span>
		</button>
	)
};

export default ButtonFavorite;