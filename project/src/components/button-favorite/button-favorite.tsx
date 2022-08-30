import { toggleFavoriteAction } from '../../store/favorites-process/favorites-async-action';
import { AuthorizationStatus, ButtonFavoriteConfig } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { memo } from 'react';

type ButtonFavorite = typeof ButtonFavoriteConfig.Card | typeof ButtonFavoriteConfig.Propety;

type ButtonFavoriteProps = {
  id: number
  isFavorite: boolean,
  buttonFavorite: ButtonFavorite,
};

function ButtonFavorite(props: ButtonFavoriteProps): JSX.Element {
  const { id, isFavorite, buttonFavorite } = props;
  const { className, size } = buttonFavorite;
  const [width, height] = size;
  const favoriteActiveClass = isFavorite
    ? `${className}-button button ${className}-button--active button`
    : `${className}-button button`;

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const handlerButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(toggleFavoriteAction({ offerId: id, status: Number(!isFavorite) }));
      return;
    }

    navigate(AppRoute.Login);
  };

  return (
    <button
      onClick={handlerButtonClick}
      className={favoriteActiveClass}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default memo(ButtonFavorite);
