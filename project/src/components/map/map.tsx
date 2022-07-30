import useMap from '../../hooks/useMap';

import { useRef } from 'react';
import { locationCity } from '../../const';
import { Offers } from '../../types/offers';

import 'leaflet/dist/leaflet.css';

function MainMap(): JSX.Element {
	const mapRef = useRef(null);
	

	useMap(mapRef, locationCity)

	return (
		<div className="cities__right-section">
			<section ref={mapRef} className="cities__map map"></section>
		</div>
	);
}

export default MainMap;