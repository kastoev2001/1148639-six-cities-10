import RoomImage from '../room-image/room-image';
import { MAX_GALLERY_IMAGES } from '../../../const';

type RoomGalleryProps = {
  images: string[],
}

function RoomGallery({ images }: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, MAX_GALLERY_IMAGES).map((image: string): JSX.Element => <RoomImage key={image} image={image} />)}
      </div>
    </div>
  );
}

export default RoomGallery;
