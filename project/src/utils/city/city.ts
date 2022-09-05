import { CITIES } from '../../const';

export const getRundomCity = (): string =>
  CITIES[Math.floor(CITIES.length * Math.random())];

export const findCity = (activeCity: string | undefined): string | null => {
  let findedCity;

  if (activeCity) {
    findedCity = CITIES.find((city) => city.toUpperCase() === activeCity.toUpperCase());
  }
  return findedCity ? findedCity : null;
};
