import { useEffect, useState, MutableRefObject } from 'react';
import { Map, TileLayer, MapOptions, LayerOptions } from 'leaflet';
import { Location } from '../types/offers';

function useMap(
  mapRef: MutableRefObject<HTMLDivElement | null>,
  location: Location | null
): Promise<Map | null> {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    const element = mapRef.current;
    const isChidren = element ? element.hasChildNodes() : false;

    const templateUrlLayer = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    const layerOptions: LayerOptions = {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    };

    if (element !== null && map === null && !isChidren && location) {
      const { latitude, longitude, zoom } = location;
      const mapOptions: MapOptions = {
        center: {
          lat: latitude,
          lng: longitude,
        },
        zoom,
      };
      const instanceMap = new Map(element, mapOptions);
      const layer = new TileLayer(templateUrlLayer, layerOptions);

      instanceMap.addLayer(layer);

      setMap(instanceMap);
    }
  }, [map, mapRef, location]);

  return Promise.resolve(map);
}

export default useMap;
