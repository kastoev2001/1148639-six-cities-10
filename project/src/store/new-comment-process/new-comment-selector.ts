import { State } from '../../types/state';

export const getNewCommentStatus = (state: State) =>
  state.newComment.newCommentStatus;
