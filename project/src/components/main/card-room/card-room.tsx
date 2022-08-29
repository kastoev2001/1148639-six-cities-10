import ButtonFavorite from '../../button-favorite/button-favorite';
import StatusRoom from '../../status-room/status-room';
import Rating from '../../rating/rating';

import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Offer } from '../../../types/offers';
import { ActiveCardRoomId } from '../../../types/main';

type CardRoomProps = {
  offer: Offer,
  onCardRoomActive: (id: ActiveCardRoomId) => void,
};


function CardRoom(props: CardRoomProps): JSX.Element {
  const { offer, onCardRoomActive } = props;
  const {
    id,
    title,
    isFavorite,
    price,
    isPremium,
    type,
    rating,
    previewImage,
  } = offer;

  const pathnameRoom = `${AppRoute.Offer}/${id}`;
  const handlerCardRoomMouseOver = () => {
    onCardRoomActive(id);
  };
  const handlerCardRoomMouseLeave = () => {
    onCardRoomActive(null);
  };

  return (
    <article
      className="cities__card place-card"
      onMouseOver={handlerCardRoomMouseOver}
      onMouseLeave={handlerCardRoomMouseLeave}
    >
      {isPremium ? <StatusRoom /> : null}
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

          {isFavorite ? <ButtonFavorite id={id} isFavorite /> : <ButtonFavorite id={id} isFavorite={false} />}

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <Rating rating={rating} />
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

export default memo(CardRoom);
