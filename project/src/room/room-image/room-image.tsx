type RoomImageProps = {
	id: string,
	image: string,
};

function RoomImage(props: RoomImageProps): JSX.Element {
	const { image, id } = props;
	
	return (
		<div className="property__image-wrapper" key={id}>
		<img className="property__image" src={image} alt="Photo studio" />
	</div>
	)
}

export default RoomImage;