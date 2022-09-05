import { getFakeMap } from '../mocks';
import { removeMarkers } from './map';
import { Layer } from 'leaflet';

const { map, markers } = getFakeMap();

describe('Business logic: remove maker', () => {
  it('Should remove markers', () => {
    removeMarkers(map, markers);
    const isMarkersHaveValue = markers.some((marker: Layer) => map.hasLayer(marker));

    expect(isMarkersHaveValue).toEqual(false);
  });
});
