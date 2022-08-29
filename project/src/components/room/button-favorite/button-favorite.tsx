import { toggleFavoriteAction } from '../../../store/favorites-process/favorites-async-action';
import { AuthorizationStatus } from '../../../const';
import { getAuthorizationStatus } from '../../../store/user-process/user-selector';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

type ButtonFavoriteProps = {
	id: number
	isFavorite: boolean,
};

function ButtonFavorite({ id, isFavorite }: ButtonFavoriteProps): JSX.Element {
	const favoriteActiveClass = isFavorite
		? 'property__bookmark-button button property__bookmark-button--active button'
		: 'property__bookmark-button button';

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
			<svg className="place-card__bookmark-icon" width="31" height="33">
				<use xlinkHref="#icon-bookmark"></use>
			</svg>
			<span className="visually-hidden">To bookmarks</span>
		</button>
	);
}

export default ButtonFavorite;
