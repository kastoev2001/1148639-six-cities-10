type HostDescriptionProps = {
	description: string,
}

function HostDescription({ description }: HostDescriptionProps): JSX.Element {
	return (
		<div className="property__description">
			<p className="property__text">
				{description}
			</p>
		</div>
	);
}

export default HostDescription;
