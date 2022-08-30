import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import { RatingStatus, FIRST_STATE_RATING, CommentLength } from '../../../const';
import { NewComment } from '../../../types/new-comment-data';
import { checkNewCommentValidity } from '../../../utils/commands';
import { postNewCommentAction } from '../../../store/new-comment-process/new-comment-async-aciton';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getNewCommentStatus } from '../../../store/new-comment-process/new-comment-selector';
import { Fragment } from 'react';

type FormCommentProps = {
  offerId: number,
}

function FormComment({ offerId }: FormCommentProps): JSX.Element {
  const [userRating, setUserRating] = useState(FIRST_STATE_RATING);
  const [userCommentText, setUserCommentText] = useState<string>('');
  const dispath = useAppDispatch();
  const newCommentStatus = useAppSelector(getNewCommentStatus);
  const ratingStatuses = Object.keys(RatingStatus);
  const ratingValues = Object.values(RatingStatus);
  const ratingStatusesSorted = ratingStatuses.sort(() => -1);
  const ratingValuesSorted = ratingValues.sort(() => -1);
  const isNewCommentFormChecked = checkNewCommentValidity(userCommentText, userRating);

  useEffect(() => {
    setUserRating(() => FIRST_STATE_RATING);
    setUserCommentText(() => '');
  }, [newCommentStatus.isSuccessed]);


  const handlerTextareaChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = target.value;
    setUserCommentText(() => comment);
  };

  const onSubmit = (newComment: NewComment): void => {
    dispath(postNewCommentAction({ id: offerId, newComment, }));
  };

  const handlerFormSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const newComment = {
      comment: userCommentText,
      rating: userRating,
    };

    onSubmit(newComment);

  };

  return (
    <form
      onSubmit={handlerFormSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingStatusesSorted.map((ratingStatus, index) => (
          <Fragment key={ratingStatus}>
            <input
              onChange={() => setUserRating(() => +ratingStatus)}
              checked={+ratingStatus === userRating}
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingStatus}
              id={`${ratingStatus}-stars`}
              type="radio"
              disabled={newCommentStatus.isLoaded}
            />
            <label
              htmlFor={`${ratingStatus}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingValuesSorted[index]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        )
        )}

      </div>
      <textarea
        onChange={handlerTextareaChange}
        value={userCommentText}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={newCommentStatus.isLoaded}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{CommentLength.MIN} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={Boolean(isNewCommentFormChecked) || newCommentStatus.isLoaded}>Submit</button>
      </div>
    </form>
  );
}

export default FormComment;
