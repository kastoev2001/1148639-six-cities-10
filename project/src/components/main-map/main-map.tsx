import useMap from '../../hooks/useMap';

import { useRef, useEffect } from 'react';
import { Marker, LatLngLiteral } from 'leaflet';
import { locationCity } from '../../const';
import { Offers, Offer, Location } from '../../types/offers';
import { currentCustomIcon } from '../../const';

import 'leaflet/dist/leaflet.css';

type MainMapProps = {
  offers: Offers,
};

function MainMap({ offers }: MainMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, locationCity);

  useEffect(() => {
    if (map) {
      offers.forEach((offer: Offer) => {
        const location: Location = offer.location;
        const markerOptions: LatLngLiteral = {
          lat: location.latitude,
          lng: location.longitude,
        };
        const marker = new Marker(markerOptions);

        marker.setIcon(currentCustomIcon);

        marker.addTo(map);
      });
    }
  });

  return (
    <div ref={mapRef} style={{width: '100%', height: '100%'}}></div>
  );
}

export default MainMap;
