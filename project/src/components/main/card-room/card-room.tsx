import ButtonFavorite from '../../button-favorite/button-favorite';
import StatusRoom from '../status-room/status-room';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { CardStatus } from '../../../const';
import { Offer } from '../../../types/offers';
import { defineRating } from '../../../utils/commands';

type CardRoomProps = {
  offer: Offer,
  cardActive?: boolean,
};


function CardRoom(props: CardRoomProps): JSX.Element {
  const { offer, cardActive } = props;
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

  const pathnameRoom = `${AppRoute.Offer}/${id}`;

  const definedRating = defineRating(rating);

  return (
    <article className="cities__card place-card" style={{ opacity: `${cardActive ? CardStatus.ACTIVE : CardStatus.NO_ACTIVE}` }}>
      {isPremium ? <StatusRoom/> : null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <NavLink to={pathnameRoom}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </NavLink>
      </div>
      <div className="place-card__info">
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
          <NavLink to={pathnameRoom}>{title}</NavLink>
        </h2>
        <p className="place-card__type">{typeRoom}</p>
      </div>
    </article>
  );
}

export default CardRoom;
