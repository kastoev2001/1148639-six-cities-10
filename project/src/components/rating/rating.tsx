import { defineRating } from '../../utils/offers/offers';

type RatingProps = {
  rating: number,
};

function Rating({ rating }: RatingProps): JSX.Element {
  const definedRating = defineRating(rating);

  return (
    <span
      style={{ width: `${definedRating}%` }}
      data-testid="rating"
    >
    </span>
  );
}

export default Rating;
