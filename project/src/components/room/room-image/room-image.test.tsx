import RoomImage from './room-image';

import { render, screen } from '@testing-library/react';
import { getFakeOffers } from '../../../utils/mocks';

const mockOffers = getFakeOffers();
const mockOffer = mockOffers[2];

describe('Component: RoomImage', () => {
  it('Should render currently', () => {
    const offerId = mockOffer.id;
    const offerImage = mockOffer.images[3];

    render(<RoomImage id={offerId} image={offerImage} />);

    expect(screen.getByAltText(/Room/i)).toBeInTheDocument();
  });
});
