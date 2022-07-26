import UserStatus from '../user-status/user-status';
import UserDescription from '../user-description/user-description';

import { Owner } from '../../../types/offers';

type OwnerRoomProps = {
	owner: Owner,
	description: string,
};

function OwnerRoom({ owner, description }: OwnerRoomProps): JSX.Element {
	const {
		avatarUrl,
		isPro,
		name,
	} = owner;

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
				{isPro ? <UserStatus isPro /> : <UserStatus />}
			</div>
			{<UserDescription description={description}/>}
		</div>
	);
}

export default OwnerRoom;