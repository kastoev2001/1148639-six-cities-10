import ListFavorite from '../../components/favorite/list-favorite/list-favorite';
import Header from '../../components/header/header';

import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';
import { Offers } from '../../types/offers';

type FavoriteProps = {
  offers: Offers
}

function Favorite({ offers }: FavoriteProps): JSX.Element {
  return (
    <div className="page">
      <Header />

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
