import useMap from '../../hooks/useMap';

import { useRef, useEffect, memo } from 'react';
import { Marker, LatLngLiteral, Layer } from 'leaflet';
import { Offer, Location } from '../../types/offers';
import { CURRENT_CUSTOM_ICON, ACTIVE_CUSTOM_ICON } from '../../const';
import { removeMarkers } from '../../utils/commands';
import { selectorGetLocationCity } from '../../store/selector';

import 'leaflet/dist/leaflet.css';
import { Offers } from '../../types/offers';
import { ActiveCardRoomId } from '../../types/main';
import { useAppSelector } from '../../hooks';

type MainMapProps = {
  offers: Offers,
  activeCardRoomId?: ActiveCardRoomId,
};

function MainMap(props: MainMapProps): JSX.Element {
  const { offers, activeCardRoomId } = props;
  const locationCity = useAppSelector(selectorGetLocationCity);
  const mapRef = useRef(null);
  const map = useMap(mapRef, locationCity);

  useEffect(() => {
    const markers: Layer[] = [];
    if (map && locationCity) {
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

        map.flyTo({ lat: latitude, lng: longitude }, zoom);
        marker.addTo(map);
      });
    }

    return () => {
      if (map) {
        removeMarkers(map, markers);
      }
    };
  });

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
  );
}

export default memo(MainMap);
