import { useState, memo } from 'react';
import { SortType } from '../../../const';
import { changeSortType } from '../../../store/main-process/main-process';
import { getCurrentSortType } from '../../../store/main-process/main-selector';
import { useAppDispatch, useAppSelector } from '../../../hooks/index';

function SortForm(): JSX.Element {
  const [isOpend, setIsOpend] = useState<boolean>(false);
  const currentSortType = useAppSelector(getCurrentSortType);
  const dispatch = useAppDispatch();

  const handlerSpanClick = () =>
    setIsOpend(!isOpend);

  const handlerLineClick = (type: SortType) => () => {
    dispatch(changeSortType(type));
    setIsOpend(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handlerSpanClick} className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpend && 'places__options--opened'}`}
        data-testid="list-sort-type"
      >
        {
          Object.values(SortType).map((type) => (
            <li
              key={type}
              className={`places__option ${currentSortType === type && 'places__option--active'}`}
              onClick={handlerLineClick(type)}
              tabIndex={0}
            >
              {type}
            </li>
          )
          )
        }
      </ul>
    </form>
  );
}

export default memo(SortForm);
