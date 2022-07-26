import NearestRoom from '../nearest-room/nearest-room';

function ListNearestRooms(): JSX.Element {
	return (
		<div className="near-places__list places__list">
			<NearestRoom />
			<NearestRoom />
			<NearestRoom />
		</div>
	);
}

export default ListNearestRooms;