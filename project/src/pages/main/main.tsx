import ListRooms from '../../components/main/list-rooms/list-rooms';
import MainMap from '../../components/main-map/main-map';
import ListCities from '../../components/main/list-cities/list-cities';
import Auth from '../../components/auth/auth';

import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { selectorFilterOffers } from '../../store/selector';
import { changeCity } from '../../store/action';
import { Offer } from '../../types/offers';

function Main(): JSX.Element {
  const { offers, activeCity, } = useAppSelector((state) => state);
  const offersFilterd = useAppSelector(selectorFilterOffers);
  const countRooms = offersFilterd.length;

  const displatch = useAppDispatch();

  const onChangeCity = (city: string): void => {
    const findedCity = offers.find((offer: Offer): boolean => offer.city.name === city);
    const selectedCity = findedCity ? findedCity.city : activeCity;
    displatch(changeCity({ city: selectedCity }));
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
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>

              <ListRooms offersFiltred={offersFilterd} />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <MainMap offersFiltred={offersFilterd} activeCity={activeCity} />
              </section>
            </div>

          </div>
        </div>
      </main>
    </div >
  );
}

export default Main;
