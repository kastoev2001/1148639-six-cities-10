import Header from '../../components/header/header'
import ListCities from '../../components/main/list-cities/list-cities'
import { useAppSelector, useAppDispatch } from '../../hooks/index'
import { getActiveCity } from '../../store/city-data/city-selector'
import { changeCity } from '../../store/city-data/city-data';

function MainEmpty(): JSX.Element {
	const activeCity = useAppSelector(getActiveCity)
	const dispatch = useAppDispatch();

	const onChangeCity = (city: string): void => {
		dispatch(changeCity(city));
	};
	return (
		<div className="page page--gray page--main">
			<Header />

			<main className="page__main page__main--index page__main--index-empty">
				<h1 className="visually-hidden">Cities</h1>
				<div className="tabs">
					<section className="locations container">
						<ListCities activeCity={activeCity} onCity={onChangeCity} />
					</section>
				</div>
				<div className="cities">
					<div className="cities__places-container cities__places-container--empty container">
						<section className="cities__no-places">
							<div className="cities__status-wrapper tabs__content">
								<b className="cities__status">No places to stay available</b>
								<p className="cities__status-description">We could not find any property available at the moment in Dusseldorf</p>
							</div>
						</section>
						<div className="cities__right-section"></div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default MainEmpty;
