type ButtonFavoriteProps = {
  isFavorite?: boolean,
};

function ButtonFavorite({ isFavorite }: ButtonFavoriteProps): JSX.Element {
  const favoriteActiveClass = isFavorite
    ? 'property__bookmark-button button button property__bookmark-button button--active button'
    : 'property__bookmark-button button button';

  return (
    <button className={favoriteActiveClass} type="button">
      <svg className="property__bookmark-icon" width="31" height="33">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default ButtonFavorite;
