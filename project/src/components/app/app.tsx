import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorite from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotPage from '../../pages/not-page/not-page';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

type AppScreenProps = {
	countRooms: number,
};
type Rooms = [];

const rooms: Rooms = [];

function App({ countRooms }: AppScreenProps): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<Main countRooms={countRooms} />} />
					<Route path='login' element={<Login />} />
					<Route path='favorites' element={<Favorite />} />
					<Route path='offer'>
						<Route path=':id' element={<Room rooms={rooms}/>} />
					</Route>
					<Route path='*' element={<NotPage />}/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
