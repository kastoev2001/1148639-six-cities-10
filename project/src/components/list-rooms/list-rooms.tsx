import { Offers } from '../../types/offers';
import CardRoom from '../card/card-room';

type ListRoomsPorps = {
	offers: Offers,
}
function ListRooms({offers}: ListRoomsPorps): JSX.Element {
	return (
		<div className="cities__places-list places__list tabs__content">
			{offers.map((offer) => <CardRoom offer={offer} />)}
		</div>
	)
}

export default ListRooms;