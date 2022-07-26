import FavoriteRoom from '../favorite-room/favorite-room';

import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { City } from '../../../types/cities';

type ListFavoriteRoomsCityProps = {
	city: City
}

function ListFavoriteRoomsCity({ city }: ListFavoriteRoomsCityProps): JSX.Element {
	const {
		name,
		rooms
	} = city;
	
	return (
		<li className="favorites__locations-items" key={name}>
<div className="favorites__locations locations locations--current">
	<div className="locations__item">
		<NavLink to={AppRoute.Root} className="locations__item-link">
			<span>{name}</span>
		</NavLink>
	</div>
</div>
<div className="favorites__places">
	{rooms.map((room): JSX.Element => <FavoriteRoom room={room} />)}
</div>
</li>
	);
}

export default ListFavoriteRoomsCity;