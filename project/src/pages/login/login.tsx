import { AppRoute, AuthorizationStatus } from '../../const';
import { NavLink, Navigate } from 'react-router-dom';
import { AuthData } from '../../types/auth-data';
import { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { loginAction } from '../../store/user-process/user-async-action';
import { checkLoginFormValidity } from '../../utils/commands';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';

function LoginScreen(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      const isCheckedLoginForm = checkLoginFormValidity(loginRef.current, passwordRef.current);

      if (isCheckedLoginForm) {
        const login = loginRef.current.value;
        const password = passwordRef.current.value;

        onSubmit({
          login,
          password,
        });
      }

    }
  };

	if (authorizationStatus === AuthorizationStatus.Auth) {
		return <Navigate to={AppRoute.Root} />;
	}

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink to={AppRoute.Root} className="header__logo-link">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handlerFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={loginRef} className="login__input form__input" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={passwordRef} className="login__input form__input" type="password" name="password" placeholder="Password" required />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <NavLink to={AppRoute.Root} className="locations__item-link">
                <span>Amsterdam</span>
              </NavLink>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
