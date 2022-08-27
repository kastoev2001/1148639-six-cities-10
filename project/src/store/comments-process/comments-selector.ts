import { State } from '../../types/state';

export const getComments = (state: State) =>
  state.comments.comments;

export const getIsCommentsLoaded = (state: State) =>
  state.comments.isCommentsLoaded;
