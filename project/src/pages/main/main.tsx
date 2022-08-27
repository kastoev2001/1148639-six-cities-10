import ListRooms from '../../components/main/list-rooms/list-rooms';
import MainMap from '../../components/main-map/main-map';
import ListCities from '../../components/main/list-cities/list-cities';
import Auth from '../../components/auth/auth';

import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { selectorFilterOffers } from '../../store/selector';
import { Offer } from '../../types/offers';
import { changeCity } from '../../store/city-data/city-data';
import { getOffers } from '../../store/offers-process/offers-selector';
import { getActiveCity } from '../../store/city-data/city-selector';
import SortForm from '../../components/main/sort-form/sort-form';

function Main(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getActiveCity);
  const offersFilterd = useAppSelector(selectorFilterOffers);
  const countRooms = offersFilterd.length;

  const displatch = useAppDispatch();

  const onChangeCity = (city: string): void => {
    const findedCity = offers.find((offer: Offer): boolean => offer.city.name === city);
    const selectedCity = findedCity ? findedCity.city : activeCity;
    displatch(changeCity(selectedCity));
  };

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink to={AppRoute.Root} className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            </div>
            <Auth />
          </div>
        </div>
      </header >

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">

            <ListCities onCity={onChangeCity} activeCity={activeCity} />

          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{countRooms} {countRooms > 1 ? 'places' : 'place'} to stay in {activeCity.name}</b>
              
							<SortForm />

              <ListRooms offersFiltred={offersFilterd} />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <MainMap offers={offersFilterd} activeCity={activeCity} />
              </section>
            </div>

          </div>
        </div>
      </main>
    </div >
  );
}

export default Main;
