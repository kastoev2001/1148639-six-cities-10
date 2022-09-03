import UserStatus from '../user-status/user-status';
import HostDescription from '../host-description/host-description';

import { Host } from '../../../types/offers';
import { memo } from 'react';

type HostRoomProps = {
	host: Host,
	description: string,
};

function HostRoom({ host, description }: HostRoomProps): JSX.Element {
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
			{<HostDescription description={description} />}
		</div>
	);
}

export default memo(HostRoom);
