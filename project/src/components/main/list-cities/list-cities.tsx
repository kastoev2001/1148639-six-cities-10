import { MouseEvent, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { CITIES } from '../../../const';

type ListCitiesProps = {
  activeCity: string,
  onCity: (city: string) => void,
};

function ListCities(props: ListCitiesProps): JSX.Element {
  const { activeCity, onCity } = props;

  const handlerAnchorClick = (city: string) => (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();

    onCity(city);
  };

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city: string): JSX.Element => (
        <li className="locations__item" key={city}>
          <NavLink onClick={handlerAnchorClick(city)} to={AppRoute.Root} className={activeCity === city ? 'locations__item-link tabs__item tabs__item--active' : 'locations__item-link tabs__item'}>
            <span>{city}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default memo(ListCities);
