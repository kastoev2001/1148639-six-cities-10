import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorite from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotPage from '../../pages/not-page/not-page';
import PrivateRoute from '../private-route/private-route';
import FavoritesEmpty from '../../pages/favorites-empty/favorites-empty';
import Loading from '../../pages/loading/loading';
import MainEmpty from '../../pages/main-empty/main-empty';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { isCheckedAuth } from '../../utils/commands';
import { getOffers, getIsOffersLoaded } from '../../store/offers-process/offers-selector';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';

function App(): JSX.Element {
	const offers = useAppSelector(getOffers);
	const isOffersLoaded = useAppSelector(getIsOffersLoaded);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

	if (isCheckedAuth(authorizationStatus) || isOffersLoaded) {
		return <Loading />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path={AppRoute.Root}>
					<Route index element={<Main />} />
					<Route path={AppRoute.MainEmpty} element={<MainEmpty />} />
					<Route path={AppRoute.Login} element={<Login />} />
					<Route path={AppRoute.Favorites} element={<PrivateRoute><Favorite offers={offers} /></PrivateRoute>} />
					<Route path={AppRoute.FavoritesEmpty} element={<FavoritesEmpty />} />
					<Route path={AppRoute.Offer}>
						<Route index element={<NotPage />} />
						<Route path=':id' element={<Room />} />
					</Route>
					<Route path='*' element={<NotPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
