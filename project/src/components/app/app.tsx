import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorite from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotPage from '../../pages/not-page/not-page';
import PrivateRoute from '../private-route/private-route';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Offers } from '../../types/offers';

type AppScreenProps = {
  countRooms: number,
	offers: Offers,
};
type Rooms = [];

const rooms: Rooms = [];

function App(props: AppScreenProps): JSX.Element {
	const {countRooms, offers} = props;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<Main countRooms={countRooms} offers={offers} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Favorite} element={ <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}><Favorite /></PrivateRoute>} />
          <Route path={AppRoute.Offer}>
            <Route path=':id' element={<Room rooms={rooms} />} />
          </Route>
          <Route path='*' element={<NotPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
