import { NavLink } from 'react-router-dom';
import { AppRoute, FIRST_CITY } from '../../const';
import { getRundomCity } from '../../utils/city';

function City(): JSX.Element {
  const rundomCity = getRundomCity();
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
