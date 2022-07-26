import RoomImage from '../room-image/room-image';

type RoomGalleryProps = {
	images: string[],
}

function RoomGallery({ images }: RoomGalleryProps): JSX.Element {
	return (
		<div className="property__gallery-container container">
			<div className="property__gallery">
				{images.map((image: string, index: number): JSX.Element => <RoomImage id={image} image={image} />)}
			</div>
		</div>
	);
}

export default RoomGallery;