import NearestRoom from '../nearest-room/nearest-room';

import { Offers, Offer } from '../../../types/offers';
import { memo } from 'react';

type ListNearestRoomsProps = {
  nearbyOffers: Offers,
};

function ListNearestRooms({ nearbyOffers }: ListNearestRoomsProps): JSX.Element {

  return (
    <div className="near-places__list places__list">
      {
        nearbyOffers.map((nearbyOffer: Offer) => {
          const key = nearbyOffer.id;

          return <NearestRoom key={key} nearbyOffer={nearbyOffer} />;
        })
      }
    </div>
  );
}

export default memo(ListNearestRooms);
