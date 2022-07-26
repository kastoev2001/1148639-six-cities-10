import { StatusRoomProps } from '../../../types/premium';

function StatusRoom({ isPremium }: StatusRoomProps): JSX.Element {
	return (
		<>
			{isPremium ? <div className="place-card__mark">
				<span>Premium</span>
			</div> : null}
		</>
	)
}

export default StatusRoom;