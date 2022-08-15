import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { CITIES } from '../../../const';
import { LocationCity } from '../../../types/offers';

type ListCitiesProps = {
  activeCity: LocationCity,
  onCity: (city: string) => void,
};

function ListCities(props: ListCitiesProps): JSX.Element {
  const { activeCity, onCity } = props;

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city: string): JSX.Element => (
        <li className="locations__item" key={city}>
          <NavLink onClick={() => onCity(city)} to={AppRoute.Root} className={activeCity.name === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
            <span>{city}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default ListCities;
