import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorite from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotPage from '../../pages/not-page/not-page';
import PrivateRoute from '../private-route/private-route';
import NotFavorites from '../../pages/not-favorites/not-favorites';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';

type AppScreenProps = {
  offers: Offers,
};

function App(props: AppScreenProps): JSX.Element {
  const { offers } = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorites} element={<PrivateRoute authorizationStatus={AuthorizationStatus.Auth}><Favorite offers={offers} /></PrivateRoute>} />
          <Route path={AppRoute.NotFavorites} element={<NotFavorites />} />
          <Route path={AppRoute.Offer}>
            <Route index element={<NotPage />} />
            <Route path=':id' element={<Room offers={offers} />} />
          </Route>
          <Route path='*' element={<NotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
