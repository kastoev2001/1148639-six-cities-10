type UserDescriptionProps = {
	description: string,
}

function UserDescription({description}: UserDescriptionProps): JSX.Element {
	return (
		<div className="property__description">
			<p className="property__text">
				{description}
			</p>
		</div>
	);
}

export default UserDescription;