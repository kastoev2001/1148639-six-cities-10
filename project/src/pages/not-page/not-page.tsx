import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';

function NotPage(): JSX.Element {
  return (
    <div className="not-page">
      <div className="not-page__content">
        <NavLink to={AppRoute.Root}>Перейти к главной странице</NavLink>
      </div>
    </div>
  );
}

export default NotPage;
