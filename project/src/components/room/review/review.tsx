import { Comment } from '../../../types/comments';
import dayjs from 'dayjs';
import Rating from '../../rating/rating';

type ReviewProps = {
  comment: Comment,
};

function Review({ comment }: ReviewProps): JSX.Element {
  const {
    comment: commentText,
    date,
    user,
    rating,
  } = comment;
  const { avatarUrl } = user;
  const name = user.name.split('@');

  const dateFormated = dayjs(date).format('MMM YYYY');
  const dateFormatedForAttribute = dayjs(date).format('MMM YYYY');

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <Rating rating={rating} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {commentText}
        </p>
        <time className="reviews__time" dateTime={dateFormatedForAttribute}>{dateFormated}</time>
      </div>
    </li>
  );
}

export default Review;
