import { defineRating } from '../../utils/commands';

type RatingProps = {
  rating: number,
};

function Rating({ rating }: RatingProps): JSX.Element {
  const definedRating = defineRating(rating);

  return (
    <span style={{ width: `${definedRating}%` }}></span>

  );
}

export default Rating;