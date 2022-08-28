import NotPage from '../not-page/not-page';
import ListNearestRooms from '../../components/room/list-nearest-rooms/list-nearest-rooms';
import RoomGallery from '../../components/room/room-gallery/room-gallery';
import HostRoom from '../../components/room/host-room/host-room';
import ButtomFavorite from '../../components/room/button-favorite/button-favorite';
import StatusRoom from '../../components/room/status-room/status-room';
import Auth from '../../components/auth/auth';
import ListReviews from '../../components/room/list-reviews/list-reviews';
import Loading from '../loading/loading';
import MainMap from '../../components/main-map/main-map';

import { AppRoute, AuthorizationStatus } from '../../const';
import { NavLink, useParams } from 'react-router-dom';
import { defineRating } from '../../utils/commands';
import FormComment from '../../components/room/form-comment/form-comment';
import { useEffect } from 'react';
import { fetchOfferAction } from '../../store/offer-process/offer-async-action';
import { fetchCommentsAction } from '../../store/comments-process/comments-async-action';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { getComments, getIsCommentsLoaded } from '../../store/comments-process/comments-selector';
import { getActiveOffer } from '../../store/offer-process/offer-selector';
import { getIsOfferLoaded } from '../../store/offer-process/offer-selector';
import { getIsNearbyOffersLoaded, getNearbyOffers } from '../../store/nearby-offers-process/nearby-offers-selector';
import { getActiveCity } from '../../store/city-data/city-selector';
import { fetchNearbyOffersAction } from '../../store/nearby-offers-process/nearby-offers-async-action';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';

function Room(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const activeOffer = useAppSelector(getActiveOffer);
  const isOfferLoaded = useAppSelector(getIsOfferLoaded);
  const isCommentsLoaded = useAppSelector(getIsCommentsLoaded);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const isNearbyOffersLoaded = useAppSelector(getIsNearbyOffersLoaded);
  const activeCity = useAppSelector(getActiveCity);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchCommentsAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id]);

  if (isOfferLoaded && isCommentsLoaded && isNearbyOffersLoaded) {
    return <Loading />;
  }

  if (activeOffer) {
    const {
      title,
      bedrooms,
      isFavorite,
      price,
      isPremium,
      type,
      rating,
      images,
      host,
      maxAdults,
      description,
    } = activeOffer;

    const definedRating = defineRating(rating);
    const commentCount = comments.length;

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
              <Auth />
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
                    {type}
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

                < HostRoom host={host} description={description} />

                <section className="property__reviews reviews">
                  <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentCount}</span></h2>

                  <ListReviews comments={comments} />

                  {authorizationStatus === AuthorizationStatus.Auth && <FormComment offerId={activeOffer.id}/>}

                </section>
              </div>
            </div>
            <section className="property__map map">
              <MainMap offers={nearbyOffers} activeCity={activeCity} />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>

              <ListNearestRooms nearbyOffers={nearbyOffers} />

            </section>
          </div>
        </main>
      </div >
    );
  }

  return <NotPage />;
}

export default Room;
