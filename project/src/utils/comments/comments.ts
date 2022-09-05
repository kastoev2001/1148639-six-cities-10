import dayjs from 'dayjs';

import { Comment } from '../../types/comments';

export const commentsSortHighTolow = (commentA: Comment, commentB: Comment): number => {
  const dateA = dayjs(commentA.date);
  const dateb = dayjs(commentB.date);

  if (dateb > dateA) {
    return 1;
  }

  if (dateb < dateA) {
    return -1;
  }

  return 0;
};
