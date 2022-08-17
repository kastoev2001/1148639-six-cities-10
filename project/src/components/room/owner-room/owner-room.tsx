import UserStatus from '../user-status/user-status';
import UserDescription from '../user-description/user-description';

import { Host } from '../../../types/offers';

type HostRoomProps = {
  host: Host,
  description: string,
};

function OwnerRoom({ host, description }: HostRoomProps): JSX.Element {
  const {
    avatarUrl,
    isPro,
    name,
  } = host;

  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>
      <div className="property__host-user user">
        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
          <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
        </div>
        <span className="property__user-name">
          {name}
        </span>
        {isPro ? <UserStatus /> : null}
      </div>
      {<UserDescription description={description} />}
    </div>
  );
}

export default OwnerRoom;
