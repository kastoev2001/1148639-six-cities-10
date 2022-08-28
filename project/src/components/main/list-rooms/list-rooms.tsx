import CardRoom from '../card-room/card-room';

import { memo } from 'react';
import { Offers, Offer } from '../../../types/offers';
import { ActiveCardRoomId } from '../../../types/main';

type ListRoomsProps = {
  offersFiltred: Offers,
  onCardRoomActive: (id: ActiveCardRoomId) => void,
};

function ListRooms({ offersFiltred, onCardRoomActive }: ListRoomsProps): JSX.Element {


  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersFiltred.map((offer: Offer): JSX.Element => (
          <CardRoom key={offer.id} offer={offer} onCardRoomActive={onCardRoomActive} />
        )
        )
      }
    </div>
  );
}

export default memo(ListRooms);
