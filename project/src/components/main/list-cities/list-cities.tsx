import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { City } from '../../../const';
import { LocationCity } from '../../../types/offers';

type ListCities = {
	city: typeof City,
	activeCity: LocationCity,
	onCity: (city: string) => void,
};

function ListCities(props: ListCities): JSX.Element {
	const { city, activeCity, onCity } = props;
	const cities = Object.values(city);
	
	return (
		<ul className="locations__list tabs__list">
			{cities.map((city: string): JSX.Element => (
		<li className="locations__item" key={city}>
		<NavLink onClick={() => onCity(city)} to={AppRoute.Root} className={activeCity.name === city ? "locations__item-link tabs__item tabs__item--active" : "locations__item-link tabs__item"}>
			<span>{city}</span>
		</NavLink>
	</li>
		))}
		</ul>
	);
}

export default ListCities;
