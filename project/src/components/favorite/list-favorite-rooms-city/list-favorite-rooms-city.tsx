import FavoriteRoom from '../favorite-room/favorite-room';

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
		<a className="locations__item-link" href="#">
			<span>{name}</span>
		</a>
	</div>
</div>
<div className="favorites__places">
	{rooms.map((room) => <FavoriteRoom room={room} />)}
</div>
</li>
	);
}

export default ListFavoriteRoomsCity;