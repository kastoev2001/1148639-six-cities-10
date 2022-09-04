import { NavLink } from 'react-router-dom';
import { CITIES, AppRoute, FIRST_CITY } from '../../const';


function City(): JSX.Element {
  const citiesCount = CITIES.length;
  const rundomNumber = Math.floor(Math.random() * citiesCount);
  const rundomCity = CITIES[rundomNumber];
  const pathnameRoot = FIRST_CITY === rundomCity ? AppRoute.Root : `${AppRoute.Root}${rundomCity}`;

  return (
    <NavLink
      to={pathnameRoot}
      className="locations__item-link"
      data-testid="link-city"
    >
      <span>{rundomCity}</span>
    </NavLink>
  );
}

export default City;
