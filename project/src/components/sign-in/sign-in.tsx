import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';

function SignIn(): JSX.Element {
  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item">
          <NavLink to={AppRoute.Login} className="header__nav-link">
            <span className="header__signout">Sign in</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SignIn;
