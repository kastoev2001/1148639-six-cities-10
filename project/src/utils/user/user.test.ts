import { checkNewCommentValidity, isCheckedAuth } from './user';
import { AuthorizationStatus } from '../../const';

const commentText = 'их по отношению ко всем другим элементам. Обратите внимание: стандарт ECMAscript не гарантирует данное поведение, и ему следуют не все';
const ratign = 3;

describe('Business logic: check user.', () => {
  it('Should be valid comment.', () => {
    const isValidComment = !checkNewCommentValidity(commentText, ratign);

    expect(isValidComment)
      .toEqual(true);
  });

  it('Should unknown auth.', () => {

    expect(isCheckedAuth(AuthorizationStatus.Unknown))
      .toEqual(true);
  });
});
