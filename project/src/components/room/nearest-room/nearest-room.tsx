import ButtonFavorite from '../../../components/button-favorite/button-favorite';
import Rating from '../../rating/rating';
import StatusRoom from '../../status-room/status-room';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Offer } from '../../../types/offers';

type NearestRoomProps = {
  nearbyOffer: Offer,
}

function NearestRoom({ nearbyOffer }: NearestRoomProps): JSX.Element {
  const {
    id,
    title,
    isFavorite,
    price,
    isPremium,
    type,
    rating,
    previewImage,
  } = nearbyOffer;

  const pathnameRoom = `${AppRoute.Offer}/${id}`;

  return (
    <article className="near-places__card place-card">
      {isPremium ? <StatusRoom /> : null}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <NavLink to={pathnameRoom}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </NavLink>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
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

export default NearestRoom;
