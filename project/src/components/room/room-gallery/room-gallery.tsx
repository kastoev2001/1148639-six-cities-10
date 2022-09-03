import RoomImage from '../room-image/room-image';
import { MAX_GALLERY_IMAGES } from '../../../const';
import { memo } from 'react';

type RoomGalleryProps = {
  images: string[],
}

function RoomGallery({ images }: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, MAX_GALLERY_IMAGES).map((image: string, index: number): JSX.Element => (
					<RoomImage
					key={image}
					image={image}
					id={index}
					/>
				))}
      </div>
    </div>
  );
}

export default memo(RoomGallery);
