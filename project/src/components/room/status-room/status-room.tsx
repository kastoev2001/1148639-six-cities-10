import { memo } from 'react';

function StatusRoom(): JSX.Element {
  return (
    <div className="property__mark">
      <span>Premium</span>
    </div>
  );
}

export default memo(StatusRoom);
