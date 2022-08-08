import useMap from '../../hooks/useMap';

import { useRef, useEffect } from 'react';
import { Marker, LatLngLiteral, Layer, Map } from 'leaflet';
import { Offer, Location } from '../../types/offers';
import { currentCustomIcon } from '../../const';

import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../hooks';
import { selectorFilterOffers } from '../../store/selector';
import { Offers, LocationCity } from '../../types/offers';

type MainMapProps = {
	offersFiltred: Offers,
	activeCity: LocationCity,
};

function MainMap({ offersFiltred, activeCity }: MainMapProps): JSX.Element {
	const mapRef = useRef(null);
	const map = useMap(mapRef, activeCity);

	const removeMarkers = (map: Map, markers: Layer[]): void => (
		markers.forEach((layer: Layer): void => {
			map.removeLayer(layer);
		})
	);

	useEffect(() => {
		let markers: Layer[] = [];
		if (map) {
			offersFiltred.forEach((offer: Offer) => {
				const { latitude, longitude, zoom } = activeCity.location;
				const location: Location = offer.location;
				const markerOptions: LatLngLiteral = {
					lat: location.latitude,
					lng: location.longitude,
				};
				const marker = new Marker(markerOptions);


				markers.push(marker);

				marker.setIcon(currentCustomIcon);

				map.flyTo({ lat: latitude, lng: longitude }, zoom);
				marker.addTo(map);
			});
		}

		return () => {
			if (map) {
				removeMarkers(map, markers);
			}
		}
	});

	return (
		<div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
	);
}

export default MainMap;
