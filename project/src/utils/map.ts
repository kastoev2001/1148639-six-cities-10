import { Map, Layer } from 'leaflet';

export const removeMarkers = (map: Map, markers: Layer[]): void => (
  markers.forEach((layer: Layer): void => {
    map.removeLayer(layer);
  })
);