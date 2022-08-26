import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State) =>
  state.user.authorizationStatus;

export const getUserEmail = (state: State) =>
  state.user.userEmail;
