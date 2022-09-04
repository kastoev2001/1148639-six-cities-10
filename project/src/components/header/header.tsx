import Auth from '../auth/auth';

import { memo, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute, logoActiveClass } from '../../const';

function Header(): JSX.Element {
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  const handlerLinkMouseDown = () => {
    linkRef.current?.classList.add(logoActiveClass);
  };

  const handlerLinkMouseup = () => {
    linkRef.current?.classList.remove(logoActiveClass);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink
              onMouseDown={handlerLinkMouseDown}
              onMouseUp={handlerLinkMouseup}
              ref={linkRef}
              to={AppRoute.Root}
              className="header__logo-link "
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </NavLink>
          </div>
          <Auth />
        </div>
      </div>
    </header >
  );
}

export default memo(Header);
