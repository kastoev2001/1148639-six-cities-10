import { Offer } from '../../types/offers';

type CardRoomProps = {
	offer: Offer,
};

type StatusRoomProps = {
	isPremium: boolean,
};

type ButtonFavoriteProps = {
	isFavorite: boolean,
};

type DefineRating = (rating: number) => number;

const defineRating: DefineRating = (rating) => {
	const definedRating = (rating / 5) * 100;

	return definedRating;
}

function StatusRoom({ isPremium }: StatusRoomProps): JSX.Element {
	return (
		<>
			{isPremium ? <div className="place-card__mark">
				<span>Premium</span>
			</div> : null}
		</>
	)
}

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
}

function CardRoom({ offer }: CardRoomProps): JSX.Element {
	const {
		id,
		title,
		isFavorite,
		price,
		isPremium,
		typeRoom,
		rating,
		previewImage,
	} = offer;

	const definedRating = defineRating(rating)

	return (
		<article className="cities__card place-card" key={id}>
			<StatusRoom isPremium={isPremium} />
			<div className="cities__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
				</a>
			</div>
			<div className="place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{price}</b>
						<span className="place-card__price-text">&#47;&nbsp;night</span>
					</div>
					<ButtonFavorite isFavorite={isFavorite} />
				</div>
				<div className="place-card__rating rating">
					<div className="place-card__stars rating__stars">
						<span style={{ width: `${definedRating}%` }}></span>
						<span className="visually-hidden">Rating</span>
					</div>
				</div>
				<h2 className="place-card__name">
					<a href="#">{title}</a>
				</h2>
				<p className="place-card__type">{typeRoom}</p>
			</div>
		</article>
	);
}

export default CardRoom;
