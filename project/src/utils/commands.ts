import { Map, Layer } from 'leaflet';
import { Offers } from '../types/offers';

type DefineRating = (rating: number) => number;

export const defineRating: DefineRating = (rating): number => {
  const definedRating = (rating / 5) * 100;

  return definedRating;
};

export const removeMarkers = (map: Map, markers: Layer[]): void => (
  markers.forEach((layer: Layer): void => {
    map.removeLayer(layer);
  })
);

export const serverToClient = (data: Offers): Offers => {

}