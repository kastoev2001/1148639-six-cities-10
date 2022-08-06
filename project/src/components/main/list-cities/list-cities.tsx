import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { City } from '../../../const';

type ListCities = {
	city: typeof City,
	activeCity: string,
};

function ListCities({ city, activeCity }: ListCities): JSX.Element {
	const cities = Object.values(city);
	
	return (
		<ul className="locations__list tabs__list">
			{cities.map((city: string): JSX.Element => (
		<li className="locations__item" key={city}>
		<NavLink to={AppRoute.Root} className={activeCity === city ? "locations__item-link tabs__item tabs__item--active" : "locations__item-link tabs__item"}>
			<span>{city}</span>
		</NavLink>
	</li>
		))}
		</ul>
	);
}

export default ListCities;
