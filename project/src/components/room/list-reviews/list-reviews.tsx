import Review from '../review/review';
import { Comments, Comment } from '../../../types/comments';
import { memo } from 'react';

type ListReviewsPros = {
  comments: Comments,
}

function ListReviews({ comments }: ListReviewsPros): JSX.Element {

  return (
    <ul className="reviews__list">
      {comments.map((comment: Comment) => {
        const { id } = comment;

        return <Review key={id} comment={comment} />;
      })}
    </ul>
  );
}

export default memo(ListReviews);
