import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotPage from '../../pages/not-page/not-page';
import PrivateRoute from '../private-route/private-route';
import Loading from '../../pages/loading/loading';

import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/index';
import { isCheckedAuth } from '../../utils/user';
import { getIsOffersLoaded } from '../../store/offers-process/offers-selector';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';

function App(): JSX.Element {
  const isOffersLoaded = useAppSelector(getIsOffersLoaded);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus) || isOffersLoaded) {
    return <Loading />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Main />} />
        <Route path=":city" element={<Main />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path={AppRoute.Offer}>
          <Route index element={<NotPage />} />
          <Route path=":id" element={<Room />} />
        </Route>
        <Route path="*" element={<NotPage />} />
      </Route>
    </Routes>
  );
}

export default App;
