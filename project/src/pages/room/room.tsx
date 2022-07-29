import NotPage from '../not-page/not-page';
import ListNearestRooms from '../../components/room/list-nearest-rooms/list-nearest-rooms';
import RoomGallery from '../../room/room-gallery/room-gallery';
import OwnerRoom from '../../components/room/owner-room/owner-room';
import ButtomFavorite from '../../components/room/button-favorite/button-favorite';
import StatusRoom from '../../components/room/status-room/status-room';

import { AppRoute } from '../../const';
import { NavLink, useParams } from 'react-router-dom';
import { Offers, Offer } from '../../types/offers';
import { defineRating } from '../../utils/commands';
import FormComment from '../../components/room/form-comment/form-comment';

type RoomProps = {
  offers: Offers,
};

type Params = {
  id?: string,
};

function Room({ offers }: RoomProps): JSX.Element {
  const params: Params = useParams();

  const paramsId = Number(params.id);

  const room = offers.find((offer: Offer): boolean => offer.id === paramsId);

  if (room) {
    const {
      title,
      bedrooms,
      isFavorite,
      price,
      isPremium,
      typeRoom,
      rating,
      images,
      owner,
      maxAdults,
      description,
    } = room;

    const definedRating = defineRating(rating);

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <NavLink to={AppRoute.Root} className="header__logo-link">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
                </NavLink>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <NavLink to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </NavLink>
                  </li>
                  <li className="header__nav-item">
                    <NavLink to={AppRoute.Login} className="header__nav-link">
                      <span className="header__signout">Sign out</span>
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header >

        <main className="page__main page__main--property">
          <section className="property">

            <RoomGallery images={images} />

            <div className="property__container container">
              <div className="property__wrapper">

                {isPremium ? <StatusRoom /> : null}

                <div className="property__name-wrapper">
                  <h1 className="property__name">
                    {title}
                  </h1>
                  {isFavorite ? <ButtomFavorite isFavorite /> : <ButtomFavorite />}
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{ width: `${definedRating}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">{rating}</span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {typeRoom}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{price}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    <li className="property__inside-item">
                      Wi-Fi
                    </li>
                    <li className="property__inside-item">
                      Washing machine
                    </li>
                    <li className="property__inside-item">
                      Towels
                    </li>
                    <li className="property__inside-item">
                      Heating
                    </li>
                    <li className="property__inside-item">
                      Coffee machine
                    </li>
                    <li className="property__inside-item">
                      Baby seat
                    </li>
                    <li className="property__inside-item">
                      Kitchen
                    </li>
                    <li className="property__inside-item">
                      Dishwasher
                    </li>
                    <li className="property__inside-item">
                      Cabel TV
                    </li>
                    <li className="property__inside-item">
                      Fridge
                    </li>
                  </ul>
                </div>

                < OwnerRoom owner={owner} description={description} />

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
                  <ul className="reviews__list">
                    <li className="reviews__item">
                      <div className="reviews__user user">
                        <div className="reviews__avatar-wrapper user__avatar-wrapper">
                          <img className="reviews__avatar user__avatar" src="img/avatar-max.jpg" width="54" height="54" alt="Reviews avatar" />
                        </div>
                        <span className="reviews__user-name">
                          Max
                        </span>
                      </div>
                      <div className="reviews__info">
                        <div className="reviews__rating rating">
                          <div className="reviews__stars rating__stars">
                            <span style={{ width: '80%' }}></span>
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <p className="reviews__text">
                          A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                          building is green and from 18th century.
                        </p>
                        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
                      </div>
                    </li>
                  </ul>
                  < FormComment />
                </section>
              </div>
            </div>
            <section className="property__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <ListNearestRooms />

            </section>
          </div>
        </main>
      </div >
    );
  }

  return (
    <NotPage />
  );
}

export default Room;
