import CardRoom from '../card-room/card-room';

import { Offers, Offer } from '../../../types/offers';

type ListRoomsProps = {
  offersFiltred: Offers,
};

function ListRooms({ offersFiltred }: ListRoomsProps): JSX.Element {


  return (
    <div className="cities__places-list places__list tabs__content">
      {offersFiltred.map((offer: Offer, index: number): JSX.Element => {
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
