import ListFavorite from '../../components/favorite/list-favorite/list-favorite';
import Auth from '../../components/auth/auth';

import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';
import { Offers } from '../../types/offers';

type FavoriteProps = {
  offers: Offers
}

function Favorite({ offers }: FavoriteProps): JSX.Element {
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>

            <ListFavorite offers={offers} />

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
