import { commentsSortHighTolow } from './comments';
import { getFakeFixedComments, getFakeFixedSortedComments } from '../mocks';

const mockFixedComments = getFakeFixedComments();
const mockFixedSortedComments = getFakeFixedSortedComments();

describe('Business logic: sort comments.', () => {
  it('Srot high tolow comments', () => {
    expect(mockFixedComments.sort(commentsSortHighTolow)).toEqual(mockFixedSortedComments);
  });
});
