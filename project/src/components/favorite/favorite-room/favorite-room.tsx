import ButtonFavorite from '../../button-favorite/button-favorite';

import { Room } from '../../../types/cities';
import { StatusRoomProps } from '../../../types/premium';
import { defineRating } from '../../../utils/commands';

type FavoriteRoomProps = {
	room: Room,
};

function StatusRoom({ isPremium }: StatusRoomProps): JSX.Element {
	return (
		<>
			{isPremium ? <div className="place-card__mark">
				<span>Premium</span>
			</div> : null}
		</>
	)
}

function FavoriteRoom({ room }: FavoriteRoomProps): JSX.Element {
	const {
		id,
		title,
		price,
		isFavorite,
		isPremium,
		typeRoom,
		previewImage,
		rating,
	} = room;

	const definedRating = defineRating(rating);

	return (
		<article className="favorites__card place-card" key={id}>
			{isPremium ? <StatusRoom isPremium /> : <StatusRoom />}
			<div className="favorites__image-wrapper place-card__image-wrapper">
				<a href="#">
					<img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
				</a>
			</div>
			<div className="favorites__card-info place-card__info">
				<div className="place-card__price-wrapper">
					<div className="place-card__price">
						<b className="place-card__price-value">&euro;{price}</b>
						<span className="place-card__price-text">&#47;&nbsp;night</span>
					</div>
					{isFavorite ? <ButtonFavorite isFavorite /> : <ButtonFavorite />}
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

export default FavoriteRoom;