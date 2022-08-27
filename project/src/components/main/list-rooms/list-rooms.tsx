import CardRoom from '../card-room/card-room';

import { Offers, Offer } from '../../../types/offers';
import { ActiveCardRoomId } from '../../../types/main';

type ListRoomsProps = {
  offersFiltred: Offers,
  onCarRoomActive: (id: ActiveCardRoomId) => void,
};

function ListRooms({ offersFiltred, onCarRoomActive }: ListRoomsProps): JSX.Element {


  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offersFiltred.map((offer: Offer): JSX.Element => (
          <CardRoom key={offer.id} offer={offer} onCarRoomActive={onCarRoomActive} />
        )
        )
      }
    </div>
  );
}

export default ListRooms;
