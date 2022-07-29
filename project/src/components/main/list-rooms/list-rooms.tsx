import CardRoom from '../card-room/card-room';

import { Offers } from '../../../types/offers';

type ListRoomsPorps = {
  offers: Offers,
}
function ListRooms({ offers }: ListRoomsPorps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer, index): JSX.Element => {
        if (index === 0) {
          return (
            <CardRoom key={offer.id} offer={offer} cardActive />
          );
        }

        return (
          <CardRoom key={offer.id} offer={offer} />
        );
      })}
    </div>
  );
}

export default ListRooms;
