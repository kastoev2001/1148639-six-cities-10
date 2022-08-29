import ListRooms from '../../components/main/list-rooms/list-rooms';
import MainMap from '../../components/main-map/main-map';
import ListCities from '../../components/main/list-cities/list-cities';
import SortForm from '../../components/main/sort-form/sort-form';
import Header from '../../components/header/header';

import { AppRoute } from '../../const';
import { useCallback, useEffect , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { selectorSortOffers } from '../../store/selector';
import { Offer } from '../../types/offers';
import { changeCity } from '../../store/city-data/city-data';
import { getOffers } from '../../store/offers-process/offers-selector';
import { getActiveCity } from '../../store/city-data/city-selector';
import { ActiveCardRoomId } from '../../types/main';


function Main(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const activeCity = useAppSelector(getActiveCity);
  const offersSorted = useAppSelector(selectorSortOffers);
  const countRooms = offersSorted.length;
	const offersSortedCount = offersSorted.length;
	const navigate = useNavigate();

  const displatch = useAppDispatch();
  const [activeCardRoomId, setActiveCardRoomId] = useState<ActiveCardRoomId>(null);

  const onChangeCity = useCallback((city: string): void => {
    displatch(changeCity(city));
  }, []);

  const onCardRoomActive = useCallback((id: ActiveCardRoomId) => {
    setActiveCardRoomId(id);
  }, []);

	useEffect(() => {
		if (!offersSortedCount) {
		navigate(AppRoute.MainEmpty);
		}
	}, [])

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
