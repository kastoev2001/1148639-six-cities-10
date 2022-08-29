import ButtonFavorite from '../../button-favorite/button-favorite';
import StatusRoom from '../status-room/status-room';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Room } from '../../../types/cities';
import { defineRating } from '../../../utils/commands';

type FavoriteRoomProps = {
  room: Room,
};

function FavoriteRoom({ room }: FavoriteRoomProps): JSX.Element {
  const {
    id,
    title,
    price,
    isFavorite,
    isPremium,
    type,
    previewImage,
    rating,
  } = room;

  const pathnameRoom = `${AppRoute.Offer}/${id}`;
  const definedRating = defineRating(rating);

  return (
    <article className="favorites__card place-card">
      {isPremium ? <StatusRoom /> : null}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <NavLink to={pathnameRoom}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </NavLink>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

					{isFavorite ? <ButtonFavorite id={id} isFavorite /> : <ButtonFavorite id={id} isFavorite={false} />}
        </div>
				
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${definedRating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <NavLink to={pathnameRoom}>{title}</NavLink>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteRoom;
