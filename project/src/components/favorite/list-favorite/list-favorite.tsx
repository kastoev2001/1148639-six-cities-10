import ListFavoriteRoomsCity from '../list-favorite-rooms-city/list-favorite-rooms-city';

import { Cities } from '../../../types/cities';

type ListFavoriteProps = {
  cities: Cities,
}

function ListFavorite({ cities }: ListFavoriteProps): JSX.Element {


  return (
    <ul className="favorites__list">
      {cities.map((city) => <ListFavoriteRoomsCity key={city.name} city={city} />)}
    </ul>
  );
}

export default ListFavorite;
