import { CITIES } from '../const';

export const getRundomCity = () =>
  CITIES[Math.floor(CITIES.length * Math.random())];
