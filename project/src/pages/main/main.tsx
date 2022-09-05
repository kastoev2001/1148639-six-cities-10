import ListRooms from '../../components/main/list-rooms/list-rooms';
import MainMap from '../../components/main-map/main-map';
import ListCities from '../../components/main/list-cities/list-cities';
import SortForm from '../../components/main/sort-form/sort-form';
import Header from '../../components/header/header';
import MainEmpty from '../main-empty/main-empty';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { selectorSortOffers } from '../../store/selector';
import { changeCity } from '../../store/city-data/city-data';
import { getActiveCity } from '../../store/city-data/city-selector';
import { ActiveCardRoomId } from '../../types/main';
import { useParams } from 'react-router-dom';
import { FIRST_CITY } from '../../const';
import { findCity } from '../../utils/city';
import NotPage from '../not-page/not-page';


function Main(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersSorted = useAppSelector(selectorSortOffers);
  const countRooms = offersSorted.length;
  const offersSortedCount = offersSorted.length;
  const { city: paramsCity } = useParams();

  const dispatch = useAppDispatch();
  const [activeCardRoomId, setActiveCardRoomId] = useState<ActiveCardRoomId>(null);

  const onChangeCity = useCallback((city: string): void => {
    dispatch(changeCity(city));
  }, [dispatch]);

  const onCardRoomActive = useCallback((id: ActiveCardRoomId) => {
    setActiveCardRoomId(id);
  }, []);

  useEffect(() => {
    const findedCity = findCity(paramsCity);

    if (!paramsCity) {
      dispatch(changeCity(FIRST_CITY));
    } else if (findedCity) {
      const city = findedCity.substring(0, 1).toUpperCase() + findedCity.slice(1).toLowerCase();

      dispatch(changeCity(city));
    } else {
      dispatch(changeCity(''));
    }
  }, [paramsCity, activeCity, dispatch]);

  if (!activeCity) {
    return <NotPage />;
  }

  if (!offersSortedCount) {
    return <MainEmpty />;
  }

  return (
    <div className="page page--gray page--main">

      <Header />

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
              <b className="places__found">{countRooms} {countRooms > 1 ? 'places' : 'place'} to stay in {activeCity}</b>

              <SortForm />

              <ListRooms offersFiltred={offersSorted} onCardRoomActive={onCardRoomActive} />

            </section>
            <div className="cities__right-section">
              <section className="cities__map map">

                <MainMap offers={offersSorted} activeCardRoomId={activeCardRoomId} />

              </section>
            </div>

          </div>
        </div>
      </main>
    </div >
  );
}

export default Main;
