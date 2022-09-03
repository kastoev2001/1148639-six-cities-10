type RoomImageProps = {
  image: string,
  id: number
};

function RoomImage(props: RoomImageProps): JSX.Element {
  const { image, id } = props;

  return (
    <div className="property__image-wrapper">
      <img className="property__image" src={image} alt={`Room ${id}`} />
    </div>
  );
}

export default RoomImage;
