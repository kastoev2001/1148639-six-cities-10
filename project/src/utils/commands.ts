import { Map, Layer } from 'leaflet';
import { AuthorizationStatus } from '../const';
import { toast } from 'react-toastify';

type DefineRating = (rating: number) => number;

const isLoginCheck = (loginElement: HTMLInputElement): boolean =>
  /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(loginElement.value);

const isPasswordCheck = (passwordElement: HTMLInputElement): boolean =>
  /^[а-яА-ЯёЁa-zA-Z0-9]+$/.test(passwordElement.value);

export const defineRating: DefineRating = (rating): number => {
  const definedRating = (rating / 5) * 100;

  return definedRating;
};

export const removeMarkers = (map: Map, markers: Layer[]): void => (
  markers.forEach((layer: Layer): void => {
    map.removeLayer(layer);
  })
);

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const isFormCheck = (loginElement: HTMLInputElement, passwordElement: HTMLInputElement): boolean => {
  const isCheckedLogin = isLoginCheck(loginElement);
  const isPasswordLogin = isPasswordCheck(passwordElement);
  let errorCount = 0;

  if (!isCheckedLogin) {
    const loginError = 'Wrong login!';

    toast.error(loginError);

    errorCount++;
  }

  if (!isPasswordLogin) {
    const passwordError = 'Wrong password!';

    toast.error(passwordError);

    errorCount++;
  }

  return !errorCount;
};
