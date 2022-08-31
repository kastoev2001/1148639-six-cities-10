import ListFavorite from '../../components/favorite/list-favorite/list-favorite';
import Header from '../../components/header/header';
import Loading from '../loading/loading';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getFavoriteOffers, getIsFavoriteOffersLoaded } from '../../store/favorites-process/favorites-selector';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import { divideRoomsByCityName } from '../../utils/offers';
import { useEffect } from 'react';
import { fetchFavoriteOffersAction } from '../../store/favorites-process/favorites-async-action';

function Favorite(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavoriteOffers);
  const isFavoriteOffersLoaded = useAppSelector(getIsFavoriteOffersLoaded);
  const cities = divideRoomsByCityName(favoriteOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (isFavoriteOffersLoaded) {
    return <Loading />;
  }

  if (!cities.length) {
    return <FavoritesEmpty />;
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ListFavorite cities={cities} />

          </section>
        </div>
      </main>
      <footer className="footer container">
        <NavLink to={AppRoute.Root} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </NavLink>
      </footer>
    </div >
  );
}

export default Favorite;
