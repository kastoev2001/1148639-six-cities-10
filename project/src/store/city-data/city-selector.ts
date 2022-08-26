import { State } from '../../types/state';

export const getActiveCity = (state: State) =>
  state.city.activeCity;
