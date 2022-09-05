import useMap from '../../hooks/use-map';

import { useRef, useEffect, memo } from 'react';
import { Marker, LatLngLiteral, Layer } from 'leaflet';
import { Offer, Location } from '../../types/offers';
import { CURRENT_CUSTOM_ICON, ACTIVE_CUSTOM_ICON } from '../../const';
import { removeMarkers } from '../../utils/map/map';
import { selectorGetLocationCity } from '../../store/selector';
import { Offers } from '../../types/offers';
import { ActiveCardRoomId } from '../../types/main';
import { useAppSelector } from '../../hooks';

import 'leaflet/dist/leaflet.css';

type MainMapProps = {
  offers: Offers,
  activeCardRoomId: ActiveCardRoomId,
};

function MainMap(props: MainMapProps): JSX.Element {
  const { offers, activeCardRoomId } = props;
  const locationCity = useAppSelector(selectorGetLocationCity);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, locationCity);

  useEffect(() => {
    const markers: Layer[] = [];
    map
      .then((mapInstanse) => {
        if (mapInstanse && locationCity) {
          offers.forEach((offer: Offer) => {
            const { latitude, longitude, zoom } = locationCity;
            const location: Location = offer.location;
            const markerOptions: LatLngLiteral = {
              lat: location.latitude,
              lng: location.longitude,
            };
            const marker = new Marker(markerOptions);
            const customIcon = offer.id === activeCardRoomId
              ? ACTIVE_CUSTOM_ICON
              : CURRENT_CUSTOM_ICON;

            markers.push(marker);

            marker.setIcon(customIcon);

            mapInstanse.flyTo({ lat: latitude, lng: longitude }, zoom);
            marker.addTo(mapInstanse);
          });
        }

        return () => {
          if (mapInstanse) {
            removeMarkers(mapInstanse, markers);
          }
        };
      });
  });

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      data-testid="map-container"
    >
    </div>
  );
}

export default memo(MainMap);
