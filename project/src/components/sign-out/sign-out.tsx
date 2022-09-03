import { MouseEvent } from 'react';
import { AppRoute } from '../../const';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { logoutAction } from '../../store/user-process/user-async-action';
import { getUserEmail } from '../../store/user-process/user-selector';
import { selectorGetFavoriteCount } from '../../store/selector';

function SignOut(): JSX.Element {
  const userEmail = useAppSelector(getUserEmail);
  const favoritesCount = useAppSelector(selectorGetFavoriteCount);

  const dispatch = useAppDispatch();

  const handlerAnchorClick = (evt: MouseEvent<HTMLAnchorElement>): void => {
    evt.preventDefault();

    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <NavLink
            to={AppRoute.Favorites}
            className="header__nav-link header__nav-link--profile"
            data-testid="avatar"
          >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{userEmail}</span>
            <span className="header__favorite-count">{favoritesCount}</span>
          </NavLink>
        </li>
        <li className="header__nav-item">
          <NavLink onClick={handlerAnchorClick} to={AppRoute.Root} className="header__nav-link">
            <span className="header__signout">Sign out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SignOut;
