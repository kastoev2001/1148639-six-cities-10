type RoomImageProps = {
  image: string,
};

function RoomImage(props: RoomImageProps): JSX.Element {
  const { image } = props;

  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={image} alt="Photo studio" />
    </div>
  );
}

export default RoomImage;
