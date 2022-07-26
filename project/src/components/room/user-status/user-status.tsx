type UserStatusProps = {
	isPro?: boolean,
};

function UserStatus({ isPro }: UserStatusProps): JSX.Element {
	return (
		<>
			{isPro
				? <span className="property__user-status">{isPro}</span>
				: null}
		</>
	)
}

export default UserStatus;